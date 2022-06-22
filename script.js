const game = (function gameboard(){
    const gameArray = ['e','e','e','e','e','e','e','e','e'];
    console.log('gameboard running');
    //calls
    render();
    //domelements
    const player1 = player('player1','player','O');
    const player2 = player('player2','player','X');
    current_turn=player1;
    const cells = document.querySelectorAll('.cell');
    //listeners
    cells.forEach((cell)=>{
        const index = cell.getAttribute('index');
        cell.addEventListener('click',updateCell);
    })
    //functions
    
    function searchCell(index)
    {
        return (document.querySelector(`div[index='${index}']`));
    }
    function player(name,type,sign)
    {
        
        return{name: name,type: type,sign: sign};
    }
    function render()
    {
        for(let i=0;i<gameArray.length;i++)
        {
            if(gameArray[i]=='e')
            {
                searchCell(i).textContent='';
            }
            else
            {
                searchCell(i).textContent=gameArray[i];
            }
        }
    }

    function updateCell(e)
    {
        index=e.target.getAttribute('index');
        gameArray[index]=current_turn.sign;
        current_turn = current_turn==player1?player2:player1;
        console.log(gameArray);
        render();
    }
 
})();

