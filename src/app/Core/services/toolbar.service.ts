import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolbarButton } from '../models/toolbar-button.type';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private visibleBtnsSubject = new BehaviorSubject<ToolbarButton[]>([]);
  visibleBtns$ = this.visibleBtnsSubject.asObservable();
  loadingButtons$ = new BehaviorSubject<ToolbarButton[]>([]);
  clickButton$ = new BehaviorSubject<ToolbarButton | null>(null);

  setVisible(actions: ToolbarButton[]): void {
    this.visibleBtnsSubject.next(actions);
  }

  setDisabled(disabledButtons: ToolbarButton[]): void {
    const disabledTitles = disabledButtons.map((b) => b.title);
    const updated = this.visibleBtnsSubject.value.map((btn) => ({
      ...btn,
      isDisabled: disabledTitles.includes(btn.title)
    }));
    this.visibleBtnsSubject.next(updated);
  }

  setLoading(buttons: ToolbarButton[]) {
    this.loadingButtons$.next(buttons);
  }

  resetLoading() {
    this.loadingButtons$.next([]);
  }

  reset(): void {
    this.visibleBtnsSubject.next([]);
    this.loadingButtons$.next([]);
    this.clickButton$.next(null);
  }
}
