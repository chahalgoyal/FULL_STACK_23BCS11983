(function (){
  const SVG_NS = "http://www.w3.org/2000/svg";
  const svg = document.getElementById('svgCanvas');
  const colorPicker = document.getElementById('color');
  const undoBtn = document.getElementById('undo');
  const clearBtn = document.getElementById('clear');
  const saveBtn = document.getElementById('save');

  let isDrawing = false;
  let startX = 0, startY = 0;
  let current = null;
  const undoStack = [];

  // Get mouse position relative to the SVG element
  function getPoint(evt){
    const rect = svg.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }

  svg.addEventListener('mousedown', (e)=>{
    // only left mouse button
    if (e.button !== 0) return;
    e.preventDefault();
    const p = getPoint(e);
    isDrawing = true;
    startX = p.x;
    startY = p.y;
    // create a circle using createElementNS
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', startX);
    circle.setAttribute('cy', startY);
    circle.setAttribute('r', 0);
    circle.setAttribute('fill', colorPicker.value);
    circle.setAttribute('stroke', 'none');
    circle.dataset.shape = 'circle';
    svg.appendChild(circle);
    current = circle;
  });

  svg.addEventListener('mousemove', (e)=>{
    if(!isDrawing || !current) return;
    const p = getPoint(e);
    const dx = p.x - startX;
    const dy = p.y - startY;
    const r = Math.sqrt(dx*dx + dy*dy);
    current.setAttribute('r', r);
  });

  function finishDrawing(){
    if(!isDrawing) return;
    isDrawing = false;
    if(current){
      const r = parseFloat(current.getAttribute('r') || 0);
      if(r < 1){
        // remove tiny accidental circle
        svg.removeChild(current);
      } else {
        undoStack.push(current);
      }
      current = null;
    }
  }

  svg.addEventListener('mouseup', finishDrawing);
  svg.addEventListener('mouseleave', finishDrawing);

  // Undo last added shape
  undoBtn.addEventListener('click', ()=>{
    const node = undoStack.pop();
    if(node && node.parentNode === svg) svg.removeChild(node);
  });

  // Clear all
  clearBtn.addEventListener('click', ()=>{
    while(undoStack.length){
      const n = undoStack.pop();
      if(n.parentNode === svg) svg.removeChild(n);
    }
  });

  // Keyboard shortcut: Ctrl/Cmd + Z to undo
  window.addEventListener('keydown', (e)=>{
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if((isMac && e.metaKey && e.key === 'z') || (!isMac && e.ctrlKey && e.key === 'z')){
      e.preventDefault();
      undoBtn.click();
    }
  });

  // Download SVG content as an .svg file
  saveBtn.addEventListener('click', ()=>{
    // clone and set explicit width/height so file is sized similarly
    const clone = svg.cloneNode(true);
    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 600;
    clone.setAttribute('width', width);
    clone.setAttribute('height', height);
    // serialize
    const svgString = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Optional: change color of an existing circle by clicking it (simple UX addition)
  svg.addEventListener('click', (e)=>{
    if(e.target && e.target.tagName === 'circle' && !isDrawing){
      const c = e.target;
      // toggle between current color and picked color
      c.setAttribute('fill', colorPicker.value);
    }
  });

})();
