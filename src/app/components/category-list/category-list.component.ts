import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categories = [
    {
      name: 'Sports',
      providers: [
        { title: 'Sports Academy 1' },
        { title: 'Sports Academy 2' },
        { title: 'Sports Academy 3' },
        { title: 'Sports Academy 4' },
        { title: 'Sports Academy 5' },
      ],
    },
    {
      name: 'Dance',
      providers: [
        { title: 'Dance Academy 1' },
        { title: 'Dance Academy 2' },
        { title: 'Dance Academy 3' },
        { title: 'Dance Academy 4' },
        { title: 'Dance Academy 5' },
      ],
    },
    {
      name: 'Music',
      providers: [
        { title: 'Music Academy 1' },
        { title: 'Music Academy 2' },
        { title: 'Music Academy 3' },
        { title: 'Music Academy 4' },
        { title: 'Music Academy 5' },
      ],
    },
    {
      name: 'Art',
      providers: [
        { title: 'Art Academy 1' },
        { title: 'Art Academy 2' },
        { title: 'Art Academy 3' },
        { title: 'Art Academy 4' },
        { title: 'Art Academy 5' },
      ],
    },
    {
      name: 'Fitness',
      providers: [
        { title: 'Fitness Academy 1' },
        { title: 'Fitness Academy 2' },
        { title: 'Fitness Academy 3' },
        { title: 'Fitness Academy 4' },
        { title: 'Fitness Academy 5' },
      ],
    },
    {
      name: 'Technology',
      providers: [
        { title: 'Tech Academy 1' },
        { title: 'Tech Academy 2' },
        { title: 'Tech Academy 3' },
        { title: 'Tech Academy 4' },
        { title: 'Tech Academy 5' },
      ],
    },
    {
      name: 'Cooking',
      providers: [
        { title: 'Cooking Academy 1' },
        { title: 'Cooking Academy 2' },
        { title: 'Cooking Academy 3' },
        { title: 'Cooking Academy 4' },
        { title: 'Cooking Academy 5' },
      ],
    },
    {
      name: 'Photography',
      providers: [
        { title: 'Photography Academy 1' },
        { title: 'Photography Academy 2' },
        { title: 'Photography Academy 3' },
        { title: 'Photography Academy 4' },
        { title: 'Photography Academy 5' },
      ],
    },
    {
      name: 'Education',
      providers: [
        { title: 'Education Academy 1' },
        { title: 'Education Academy 2' },
        { title: 'Education Academy 3' },
        { title: 'Education Academy 4' },
        { title: 'Education Academy 5' },
      ],
    },
    {
      name: 'Health',
      providers: [
        { title: 'Health Academy 1' },
        { title: 'Health Academy 2' },
        { title: 'Health Academy 3' },
        { title: 'Health Academy 4' },
        { title: 'Health Academy 5' },
      ],
    },
    {
      name: 'Business',
      providers: [
        { title: 'Business Academy 1' },
        { title: 'Business Academy 2' },
        { title: 'Business Academy 3' },
        { title: 'Business Academy 4' },
        { title: 'Business Academy 5' },
      ],
    },
    {
      name: 'Travel',
      providers: [
        { title: 'Travel Academy 1' },
        { title: 'Travel Academy 2' },
        { title: 'Travel Academy 3' },
        { title: 'Travel Academy 4' },
        { title: 'Travel Academy 5' },
      ],
    },
  ];

  @ViewChildren('categorySection') categoryRefs!: QueryList<ElementRef>;
  @ViewChild('tabSection', { static: false }) tabListRef!: ElementRef;

  activeTab = this.categories[0].name;
  handleTabClick(category: string, idx: number) {
    this.activeTab = category;
    this.categoryRefs
      .toArray()
      [idx].nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    let visibleCategories: { name: string; idx: number }[] = [];

    this.categoryRefs.forEach((section, idx) => {
      const rect = section.nativeElement.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        visibleCategories.push({ name: this.categories[idx].name, idx });
      }
    });

    if (visibleCategories.length > 0) {
      const lastVisible = visibleCategories[0];
      if (this.activeTab !== lastVisible.name) {
        this.activeTab = lastVisible.name;
        this.scrollActiveTabIntoView();
      }
    }
  }

  scrollActiveTabIntoView() {
    const activeTabIndex = this.categories.findIndex(
      (category) => category.name === this.activeTab
    );

    if (activeTabIndex === -1 || !this.tabListRef) return;

    const tabListElement = this.tabListRef.nativeElement;
    const activeTabElement = tabListElement.children[activeTabIndex];
    console.log(activeTabElement);

    if (activeTabElement) {
      const tabListRect = tabListElement.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();

      if (tabRect.left < tabListRect.left) {
        tabListElement.scrollLeft -= tabListRect.left - tabRect.left;
      } else if (tabRect.right > tabListRect.right) {
        tabListElement.scrollLeft += tabRect.right - tabListRect.right;
      }
    }
  }
}
