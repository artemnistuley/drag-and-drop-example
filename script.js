let ball = document.querySelector('#ball');
let gate = document.querySelector('#gate');

let currentDroppable = null;

function onMouseDown(event) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    ball.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ball.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.droppable');

    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        leaveDroppable(currentDroppable);
      }

      currentDroppable = droppableBelow;

      if (currentDroppable) {
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  }
}

ball.addEventListener('mousedown', onMouseDown);

ball.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

function enterDroppable(elem) {
  elem.style.background = 'pink';
}

function leaveDroppable(elem) {
  elem.style.background = '';
}
