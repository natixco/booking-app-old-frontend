export function btnHover() {
  var allbtn: any = document.getElementsByClassName('btn');
  var allhover: any = document.getElementsByClassName('btn-hover');

  for(let i=0;i<allbtn.length;i++) {
    allbtn[i].addEventListener('mousemove', (function(e) {
      let m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0, obj = this;

      if (!e){e = window.event;}
      if (e.pageX || e.pageY){
          m_posx = e.pageX;
          m_posy = e.pageY;
      } else if (e.clientX || e.clientY){
          m_posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          m_posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      if (obj.offsetParent){
        do { 
          e_posx += obj.offsetLeft;
          e_posy += obj.offsetTop;
        } while (obj = obj.offsetParent);
      }
      
      let x = m_posx-e_posx;
      let y = m_posy-e_posy;

      allhover[i].style.top = y + 'px';
      allhover[i].style.left = x + 'px';
    }));

    allbtn[i].addEventListener('mouseenter', function(e) {
      allhover[i].style.opacity = 1;
    });

    allbtn[i].addEventListener('mouseleave', function(e) {
      allhover[i].style.opacity = 0;
    });
  }
}