import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() pos1 = 0;
  @Input() pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  top = 0;
  clicked = false;

  ngOnInit(): void {
    this.dragElement(document.getElementById('mydiv'));
    let elmnt = document.getElementById('mydiv');
    let offTop = elmnt!.offsetTop + this.pos2;
    let offLeft = elmnt!.offsetLeft + this.pos1;
    elmnt!.style.top = offTop + 'px';
    elmnt!.style.left = offLeft + 'px';
  }

  dragElement(elmnt: any) {
    if (document.getElementById(elmnt.id + 'header')) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + 'header')!.onmousedown =
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
    console.log(this.pos3);
    this.clicked = true;
    /*document.onmouseup = this.closeDragElement;
    document.onmousemove = this.elementDrag;*/
  }

  dragMouseUp(e: any) {
    console.log('mouse up');
    e = e || window.event;
    e.preventDefault();

    this.clicked = false;
  }

  elementDrag(e: any) {
    console.log('this.pos3');
    e = e || window.event;
    e.preventDefault();

    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    console.log(this.pos1);

    if (this.clicked) {
      let elmnt = document.getElementById('mydiv');
      let offTop = elmnt!.offsetTop - this.pos2;
      let offLeft = elmnt!.offsetLeft - this.pos1;
      console.log(offTop);
      elmnt!.style.top = offTop + 'px';
      elmnt!.style.left = offLeft + 'px';
    }
  }

  closeDragElement() {
    console.log('t');
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
