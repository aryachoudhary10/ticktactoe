
const x_class='x'
const circle_class='circle'
let circleturn
const winning_combination=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const board=document.getElementById("board")
    const winningmessage=document.querySelector('[data-winning-message]')
    const winningmessageelement=document.getElementById("winning-message")
    const restartbutton=document.getElementById('restart-button')
  startgame()
  restartbutton.addEventListener('click',startgame)
    function startgame(){
        circleturn=false
        cells.forEach(cell => {
        circleturn=false
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    });
    setboardhover()
    winningmessageelement.classList.remove('show')
    }
    function handleClick(e) {
    const cell = e.target
    const currentclass= circleturn?circle_class:x_class
    placemark(cell,currentclass)
    if(checkwin(currentclass))
    {
        endgame(false)
    }
    else if(isdraw()){
        endgame(true)
    }
    else
    {
    swapturn()
    setboardhover()
    }
    }
    function isdraw(){
        return [...cells].every(cell=>{
            return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
        })
    }
    function endgame(draw){
        if(draw)
        {
            winningmessage.innerText='Draw!'
        }
        else{
            winningmessage.innerText = `${circleturn?"O's":"X's"}Wins!`
        }
        winningmessageelement.classList.add('show')
    }
    

    
  function placemark(cell,currentclass){
    cell.classList.add(currentclass)
  }

  function swapturn() {
    circleturn=!circleturn
  }

  function setboardhover(){
    board.classList.remove(x_class)
    board.classList.remove(circle_class)
    if(circleturn)
    {
        board.classList.add(circle_class)
    }
    else{
        board.classList.add(x_class)
    }

}


function checkwin(currentclass)
{
    return winning_combination.some(combination =>{
        return combination.every(index=>{
            return cells[index].classList.contains(currentclass)
        })
    })
}
});