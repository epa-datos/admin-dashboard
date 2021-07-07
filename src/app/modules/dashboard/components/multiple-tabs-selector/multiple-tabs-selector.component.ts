import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-multiple-tabs-selector',
  templateUrl: './multiple-tabs-selector.component.html',
  styleUrls: ['./multiple-tabs-selector.component.scss']
})
export class MultipleTabsSelectorComponent implements OnInit {
  @Input() showAllSelectedTab: boolean = true; // to show 'select all' tab
  @Input() adjustTabsRow: boolean;

  private _tabList: TabItem[];
  get tabList() {
    return this._tabList;
  }
  @Input() set tabList(value) {
    this._tabList = value;
  }

  private _selectedTabs: (number | string)[];
  get selectedTabs() {
    return this._selectedTabs;
  }
  @Input() set selectedTabs(value) {
    this._selectedTabs = value;
    // this.getAllSelectTabValue();
  }

  @Output() private selectedTabsChange = new EventEmitter<(number | string)[]>();

  allSelectedTab: boolean;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getAllSelectTabValue();
  }

  getAllSelectTabValue() {
    if (this.showAllSelectedTab && (!this.selectedTabs || this.selectedTabs?.length < 1)) {
      this.allSelectedTab = true;

    } else {
      this.allSelectedTab = false;
    }

    console.log('allSelectedTab', this.allSelectedTab)
  }

  selectedTab(ev, item: TabItem) {
    console.log('ev.ctrlKey', ev?.ctrlKey)
    console.log('item', item)
    console.log('selectedTabs', this.selectedTabs)

    // unique selection (click over one tab except 'select all' tab)
    if (!ev?.ctrlKey && item?.id) {
      this.selectedTabs = [item.id];
    }

    // unique selection (ctrl + click after 'select all' tab)
    else if (ev?.ctrlKey && !this.selectedTabs && item?.id) {
      this.selectedTabs = [item.id];
    }

    // multiple selection ('select all' tab)
    else if (!item) {
      this.selectedTabs = this.tabList.map((item: any) => item.id);
    }

    // multiple selection (any tab except 'select all' tab)
    else if (ev?.ctrlKey) {
      const repeatedItemIndex = this.selectedTabs.findIndex((i: any) => i === item.id);

      if (repeatedItemIndex >= 0) {
        // avoid repeated items
        this.selectedTabs.splice(repeatedItemIndex, 1)
      } else {
        !this.selectedTabs.some((i: any) => i === item.id) && this.selectedTabs.push(item.id);
      }
    }

    console.log('selectedTabs', this.selectedTabs)
    console.log('______________________________')

    this.selectedTabsChange.emit(this.selectedTabs)
  }

}

export interface TabItem {
  id: number | string,
  name: string
}
