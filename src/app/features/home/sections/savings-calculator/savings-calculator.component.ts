import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-savings-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-12 sm:py-16 bg-[#F8F9FB] border-t border-slate-200/70 relative overflow-hidden">
      <div class="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span class="inline-block text-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1 bg-accent/10 rounded-full border border-accent/20">
            Rentabilité & Économies Famille
          </span>
          <h2 class="font-heading text-xl sm:text-2xl md:text-3xl text-primary font-bold tracking-tight">
            Combien économisez-vous avec ALTERNIA ?
          </h2>
          <div class="section-divider"></div>
          <p class="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed pt-1">
            Comparez le coût des cours particuliers à domicile avec l'investissement dans un assistant disponible 24h/24 toute l'année.
          </p>
        </div>

        <!-- Boîte de calcul interactive en 2 colonnes -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Colonne Curseurs (Paramètres de la famille) -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Curseur 1 : Nombre d'enfants scolarisés -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="font-bold text-slate-800">Nombre d'enfants scolarisés à la maison :</span>
                <span class="font-heading font-extrabold text-primary text-base sm:text-lg bg-primary/10 px-3 py-0.5 rounded-lg">
                  {{ childrenCount() }} {{ childrenCount() > 1 ? 'enfants' : 'enfant' }}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                [ngModel]="childrenCount()"
                (ngModelChange)="childrenCount.set($event)"
                class="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>1 enfant</span>
                <span>2 enfants</span>
                <span>3 enfants</span>
                <span>4 enfants</span>
                <span>5+ enfants</span>
              </div>
            </div>

            <!-- Curseur 2 : Dépense mensuelle en répétiteurs / cours du soir -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="font-bold text-slate-800">Dépenses actuelles en répétiteur / mois :</span>
                <span class="font-heading font-extrabold text-accent text-base sm:text-lg bg-accent/10 px-3 py-0.5 rounded-lg">
                  {{ formatCfa(tutorCostPerMonth()) }} FCFA
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="100000"
                step="5000"
                [ngModel]="tutorCostPerMonth()"
                (ngModelChange)="tutorCostPerMonth.set($event)"
                class="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div class="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>15 000 F</span>
                <span>40 000 F</span>
                <span>70 000 F</span>
                <span>100 000 F</span>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-slate-700">
              <div class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </div>
              <p class="leading-relaxed">
                Un répétiteur ne vient que 2 ou 3 heures par semaine et ne maîtrise pas toutes les matières. ALTERNIA accompagne <strong>tous vos enfants</strong> 7j/7, sur toutes les matières du programme.
              </p>
            </div>

          </div>

          <!-- Colonne Résultat (Économies nettes calculées) -->
          <div class="lg:col-span-5 bg-gradient-to-br from-primary to-[#253775] text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between space-y-5">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-secondary block mb-1">
                Bilan sur l'année scolaire (9 mois)
              </span>
              
              <div class="space-y-3 pt-2">
                <div class="flex justify-between items-center text-xs text-white/80 border-b border-white/10 pb-2">
                  <span>Coût cours particuliers :</span>
                  <span class="font-bold text-white line-through decoration-red-400">
                    {{ formatCfa(totalTutorYear()) }} FCFA
                  </span>
                </div>

                <div class="flex justify-between items-center text-xs text-white/80 border-b border-white/10 pb-2">
                  <span>Investissement ALTERNIA :</span>
                  <span class="font-bold text-emerald-400">
                    À partir de 65 000 FCFA
                  </span>
                </div>
              </div>

              <!-- Économie estimée -->
              <div class="mt-4 pt-2 text-center bg-white/10 rounded-xl p-3 border border-white/15">
                <span class="text-[11px] text-white/80 block">Économie nette estimée pour votre foyer :</span>
                <span class="font-heading font-extrabold text-2xl sm:text-3xl text-secondary block mt-0.5">
                  + {{ formatCfa(netSavings()) }} FCFA
                </span>
                <span class="text-[10px] text-emerald-300 font-bold block mt-1">
                  Soit jusqu'à {{ savingsPercentage() }}% d'économies sur votre budget scolaire !
                </span>
              </div>
            </div>

            <!-- CTA direct -->
            <a
              [href]="getWhatsappLink()"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-accent hover:bg-[#d87212] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center gap-2"
            >
              <span>Commander pour rentabiliser</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  `
})
export class SavingsCalculatorComponent {
  readonly childrenCount = signal<number>(2);
  readonly tutorCostPerMonth = signal<number>(35000);

  // 9 mois d'école
  readonly totalTutorYear = computed(() => {
    return this.tutorCostPerMonth() * 9;
  });

  // Prix indicatif du boîtier de base
  readonly alterniaCost = 65000;

  readonly netSavings = computed(() => {
    const savings = this.totalTutorYear() - this.alterniaCost;
    return savings > 0 ? savings : 0;
  });

  readonly savingsPercentage = computed(() => {
    const total = this.totalTutorYear();
    if (total <= 0) return 0;
    return Math.min(85, Math.round((this.netSavings() / total) * 100));
  });

  formatCfa(val: number): string {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getWhatsappLink(): string {
    const msg = encodeURIComponent(
      `Bonjour ALTERNIA, d'après votre calculateur, j'ai ${this.childrenCount()} enfant(s) et je souhaite commander un boîtier pour optimiser nos dépenses d'accompagnement scolaire.`
    );
    return `https://wa.me/22375260610?text=${msg}`;
  }
}
