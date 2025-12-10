import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service.client';
import { Widget } from '../../../models/widget.model.client';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css'],
  standalone: false,
})
export class WidgetListComponent implements OnInit {
  uid: string = '';
  wid: string = '';
  wgid: string = '';
  pid: string = '';
  widgets: Widget[] = [];
  searchTerm: string = '';
  activeFilter: string = 'all';
  filteredWidgets: Widget[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private widgetService: WidgetService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.pid = params['pid'];

      this.widgetService
        .findWidgetByPageId(this.pid)
        .subscribe((widgets: Widget[]) => {
          this.widgets = widgets || [];

          // ⭐ SORT BY DATE (newest ➝ oldest)
          this.widgets.sort((a, b) => {
            const dateA = new Date(a.dateCreated || 0).getTime();
            const dateB = new Date(b.dateCreated || 0).getTime();
            return dateB - dateA;
          });

          this.filteredWidgets = [...this.widgets];
        });
    });
  }

  // Navigation methods
  navigateBack() {
    this.router.navigate(['user', this.uid, 'website', this.wid, 'page']);
  }

  navigateToWidgetChooser() {
    this.router.navigate([
      'user',
      this.uid,
      'website',
      this.wid,
      'page',
      this.pid,
      'widget',
      'new',
    ]);
  }

  // Widget management methods
  editWidget(widgetId: string | undefined) {
    if (!widgetId) return;
    this.router.navigate([
      'user',
      this.uid,
      'website',
      this.wid,
      'page',
      this.pid,
      'widget',
      widgetId,
    ]);
  }

  deleteWidget(widgetId: string | undefined) {
    if (!widgetId) return;
    if (confirm('Are you sure you want to delete this widget?')) {
      this.widgetService.deleteWidget(widgetId).subscribe(() => {
        this.widgets = this.widgets.filter((w) => w.id !== widgetId);
        this.filteredWidgets = this.filteredWidgets.filter(
          (w) => w.id !== widgetId
        );
      });
    }
  }

  moveWidget(widgetId: string | undefined) {
    if (!widgetId) return;
    // Placeholder for move functionality
    console.log('Move widget:', widgetId);
    alert('Move functionality coming soon!');
  }

  duplicateAllWidgets() {
    // Placeholder for duplicate functionality
    console.log('Duplicate all widgets');
    alert('Duplicate functionality coming soon!');
  }

  reorderWidgets() {
    // Placeholder for reorder functionality
    console.log('Reorder widgets');
    alert('Reorder functionality coming soon!');
  }

  clearAllWidgets() {
    if (
      confirm(
        'Are you sure you want to delete all widgets? This cannot be undone.'
      )
    ) {
      this.widgets.forEach((widget) => {
        if (widget.id) {
          this.widgetService.deleteWidget(widget.id).subscribe();
        }
      });
      this.widgets = [];
      this.filteredWidgets = [];
    }
  }

  // Filter and search methods
  filterByType(type: string) {
    this.activeFilter = type;
    this.applyFilters();
  }

  applyFilters() {
    console.log(
      'Applying filters with searchTerm:',
      this.searchTerm,
      'activeFilter:',
      this.activeFilter
    );
    let filtered = this.widgets;

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(
        (widget) =>
          this.getWidgetTypeName(widget.widgetType)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          (widget.text &&
            widget.text.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (this.activeFilter !== 'all') {
      if (this.activeFilter === 'content') {
        filtered = filtered.filter((widget) =>
          ['HEADING', 'TEXT', 'HTML'].includes(widget.widgetType)
        );
      } else if (this.activeFilter === 'media') {
        filtered = filtered.filter((widget) =>
          ['IMAGE', 'YOUTUBE'].includes(widget.widgetType)
        );
      }
    }

    this.filteredWidgets = filtered;
    console.log('Filtered result:', this.filteredWidgets);
  }

  // Helper methods for widget categorization
  isContentWidget(widgetType: string): boolean {
    return ['HEADING', 'TEXT', 'HTML'].includes(widgetType);
  }

  isMediaWidget(widgetType: string): boolean {
    return ['IMAGE', 'YOUTUBE'].includes(widgetType);
  }

  // Utility methods
  getActiveWidgetsCount(): number {
    return this.widgets.length;
  }

  getUniqueTypesCount(): number {
    const types = new Set(this.widgets.map((w) => w.widgetType));
    return types.size;
  }

  getWidgetTypeClass(widgetType: string): string {
    switch (widgetType.toLowerCase()) {
      case 'heading':
        return 'heading';
      case 'text':
        return 'text';
      case 'html':
        return 'html';
      case 'image':
        return 'image';
      case 'youtube':
        return 'youtube';
      default:
        return 'default';
    }
  }

  trackByWidgetId(index: number, widget: Widget): string {
    return widget.id || index.toString();
  }

  formatDate(date: any): string {
    if (!date) return 'Recently';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Recently';
    return d.toLocaleDateString();
  }

  // Existing methods
  getYoutubeUrl(url: string) {
    let embedUrl = 'https://www.youtube.com/embed/';
    const parsedUrl = url.split('/');
    //transfer video url into embedded url

    embedUrl += parsedUrl[parsedUrl.length - 1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  parseHTML(text: string) {
    var parsedText = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    return parsedText;
  }

  getWidgetTypeName(widgetType: string): string {
    switch (widgetType) {
      case 'HEADING':
        return 'Header';
      case 'TEXT':
        return 'Text';
      case 'IMAGE':
        return 'Image';
      case 'YOUTUBE':
        return 'YouTube';
      case 'HTML':
        return 'HTML';
      default:
        return 'Unknown';
    }
  }
}
