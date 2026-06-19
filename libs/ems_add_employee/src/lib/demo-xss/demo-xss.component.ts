import { Component, ElementRef, ViewChild, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-xss',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './demo-xss.component.html',
  styleUrls: ['./demo-xss.component.scss'],
})
export class DemoXssComponent {
  private sanitizer = inject(DomSanitizer);

  // Input payload for XSS testing
  public payload = signal('<img src=x onerror="alert(\'XSS Terpicu!\')">');

  // Predefined payloads to make it easy for users to test
  public readonly presets = [
    {
      name: 'Image Error (Aktif/Populer)',
      value: '<img src=x onerror="alert(\'XSS Terpicu melalui onerror!\')">',
      desc: 'Memicu XSS saat gambar gagal dimuat. Metode paling efektif via innerHTML.'
    },
    {
      name: 'Tag Script (Pasif di innerHTML)',
      value: '<script>alert(\'XSS via Script!\')</script>',
      desc: 'Sesuai spesifikasi HTML5, tag script tidak dieksekusi jika dimasukkan lewat innerHTML.'
    },
    {
      name: 'Tautan JavaScript (Href)',
      value: '<a href="javascript:alert(\'XSS via tautan!\')">Klik Saya untuk XSS</a>',
      desc: 'Memicu XSS saat pengguna mengklik tautan tersebut.'
    },
    {
      name: 'HTML Aman (Format Biasa)',
      value: '<strong class="text-success">Teks Tebal Hijau</strong> dan <em>Teks Miring</em>',
      desc: 'HTML aman yang seharusnya lolos sanitasi Angular tanpa memicu XSS.'
    }
  ];

  // Element reference for direct DOM manipulation demo
  @ViewChild('directDomTarget', { static: false }) directDomTarget!: ElementRef<HTMLDivElement>;

  // 1. DomSanitizer Bypass (Vulnerable)
  public bypassedPayload = computed<SafeHtml>(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.payload());
  });

  // 2. Custom Safe Escaping
  public customSanitizedPayload = computed<string>(() => {
    return this.escapeHtml(this.payload());
  });

  constructor() {
    // Sync direct DOM element when payload changes
    effect(() => {
      const currentPayload = this.payload();
      if (this.directDomTarget) {
        // Direct manipulation bypasses Angular's sanitizer completely!
        this.directDomTarget.nativeElement.innerHTML = currentPayload;
      }
    });
  }

  // Triggered when preset is clicked
  public setPreset(value: string): void {
    this.payload.set(value);
  }

  // Simple custom escaping function
  private escapeHtml(text: string): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
