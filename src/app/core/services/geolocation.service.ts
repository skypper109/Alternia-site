import { Injectable } from '@angular/core';
import { Observable, from, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  /**
   * Attempts to get the user's city via browser geolocation + OpenStreetMap reverse geocoding.
   * Returns null if unavailable or denied. Privacy-first: only used when explicitly requested.
   */
  getCity(): Observable<string | null> {
    if (!navigator.geolocation) {
      return of(null);
    }

    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 6000,
          maximumAge: 300000
        });
      })
    ).pipe(
      switchMap(position => {
        const { latitude, longitude } = position.coords;
        return from(
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { 'Accept-Language': 'fr' } }
          ).then(r => r.json())
        );
      }),
      map((data: Record<string, any>) => {
        const addr = data?.['address'] as Record<string, string> | undefined;
        return (addr?.['city'] ?? addr?.['town'] ?? addr?.['village'] ?? addr?.['county'] ?? null) as string | null;
      }),
      catchError(() => of(null))
    );
  }
}
