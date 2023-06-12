import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  static navCount = 0;
  @Input() pos1 = 0;
  @Input() pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  top = 0;
  clicked = false;
  navId = 0;
  constructor() {
    NavComponent.navCount++;
    this.navId = NavComponent.navCount;
  }
  getStaticCount() {
    return this.navId;
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.dragElement(document.getElementById('mydiv' + this.navId));
      let elmnt = document.getElementById('mydiv' + this.navId);
      let offTop = elmnt!.offsetTop + this.pos2;
      let offLeft = elmnt!.offsetLeft + this.pos1;
      elmnt!.style.top = offTop + 'px';
      elmnt!.style.left = offLeft + 'px';
    }, 1);
  }

  dragElement(elmnt: any) {
    console.log(elmnt);
    if (document.getElementById(elmnt.id + 'header' + this.navId)) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + 'header' + this.navId)!.onmousedown =
        this.dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = this.dragMouseDown;
    }
  }

  dragMouseDown(e: any) {
    console.log('mouse down');
    e = e || window.event;
    e.preventDefault();

    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    this.clicked = true;
  }

  dragMouseUp(e: any) {
    console.log('mouse up');
    e = e || window.event;
    e.preventDefault();

    this.clicked = false;
  }

  elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();

    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    if (this.clicked) {
      let elmnt = document.getElementById('mydiv' + this.navId);
      let offTop = elmnt!.offsetTop - this.pos2;
      let offLeft = elmnt!.offsetLeft - this.pos1;

      elmnt!.style.top = offTop + 'px';
      elmnt!.style.left = offLeft + 'px';
    }
  }

  closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
