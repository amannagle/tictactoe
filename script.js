(function gameboard(){
    const gameArray = ['o','x','o','x','x','e','x','x','x'];
    console.log('gameboard running');
    //calls
    render();
    //domelements
    current_turn='player1';
    const cells = document.querySelectorAll('.cell');
    //listeners
    cells.forEach((cell)=>{
        const index = cell.getAttribute('index');
        cell.addEventListener('click',updateCell);
    })
    //functions
    const player1 = player('player1','player','O');
    const player2 = player('player2','player','X');
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
        if(current_turn == 'player1')
        {
        e.target.textContent=player1.sign;
        current_turn ='player2';
        }
        else
        e.target.textContent=player2.sign;
    }


})();

