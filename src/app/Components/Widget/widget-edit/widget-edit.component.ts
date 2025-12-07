import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService } from '../../../services/widget.service.client';
import { Widget } from '../../../models/widget.model.client';
@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css'],
})
export class WidgetEditComponent implements OnInit {
  uid: string = '';
  wid: string = '';
  wgid: string = '';
  pid: string = '';
  widgets?: Widget[];
  isLoading: boolean = false;
  widget: Widget = {
    widgetType: '',
    pageId: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private widgetService: WidgetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.wgid = params['wgid'];
      this.pid = params['pid'];

      // Only try to load widget if it's an existing widget (not 'new')
      if (this.wgid && this.wgid !== 'new') {
        this.widgetService
          .findWidgetById(this.wgid)
          .subscribe((widget: Widget) => {
            this.widget = widget;
          });
      } else {
        // For new widgets, we'll create it only when save is called
        this.widget = {
          widgetType: '',
          pageId: this.pid,
        };
      }
    });
  }

  saveWidget() {
    this.isLoading = true;

    // If this is a new widget (wgid is 'new'), create it first
    if (this.wgid === 'new') {
      this.widgetService.createWidget(this.pid, this.widget).subscribe(
        (widget: Widget) => {
          // Navigate to the actual widget edit page with the new widget ID
          this.router.navigate([
            'user',
            this.uid,
            'website',
            this.wid,
            'page',
            this.pid,
            'widget',
            widget.id,
          ]);
        },
        (error) => {
          console.error('Error creating widget:', error);
          this.isLoading = false;
        }
      );
    } else {
      // For existing widgets, update it
      this.widgetService.updateWidget(this.wgid, this.widget).subscribe(
        (widget: Widget) => {
          this.widget = widget;
          this.isLoading = false;
          // Navigate back to widget list after successful update
          this.router.navigate([
            'user',
            this.uid,
            'website',
            this.wid,
            'page',
            this.pid,
            'widget',
          ]);
        },
        (error) => {
          console.error('Error updating widget:', error);
          this.isLoading = false;
        }
      );
    }
  }

  // Method to handle navigation back without saving
  navigateBack(event: Event) {
    // Prevent default form submission and stop propagation
    event.preventDefault();
    event.stopImmediatePropagation();
    this.widgetService
      .deleteWidget(this.wgid)
      .subscribe((widgets: Widget[]) => {
        this.router.navigate([
          '/user',
          this.uid,
          'website',
          this.wid,
          'page',
          this.pid,
          'widget',
        ]);
      });
  }
}
