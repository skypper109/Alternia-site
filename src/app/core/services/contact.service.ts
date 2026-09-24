import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { ContactForm } from '../models/contact-form.model';

const STORAGE_SUBMISSIONS_KEY = 'alternia_contact_submissions';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly apiUrl = '/api/contact';

  constructor(private http: HttpClient) {}

  /**
   * Submits the contact form.
   * Stores in localStorage as backup and simulates or executes submission.
   */
  submit(form: ContactForm): Observable<{ success: boolean }> {
    try {
      const existingStr = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
      const list = existingStr ? JSON.parse(existingStr) : [];
      list.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(list));
    } catch {
      // ignore localStorage errors
    }

    console.log('[ContactService] Formulaire enregistré avec succès :', form);
    return of({ success: true }).pipe(delay(1200));
  }
}

