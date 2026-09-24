import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { ContactForm } from '../models/contact-form.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  // TODO: Replace with real API endpoint when backend is available
  private readonly apiUrl = '/api/contact';

  constructor(private http: HttpClient) {}

  /**
   * Submits the contact form.
   * Currently uses a mock response for demonstration.
   * To enable real submission: return this.http.post<{success: boolean}>(this.apiUrl, form);
   */
  submit(form: ContactForm): Observable<{ success: boolean }> {
    console.log('[ContactService] Form submitted:', form);
    // Mock — remove when backend is ready
    return of({ success: true }).pipe(delay(1500));
  }
}
