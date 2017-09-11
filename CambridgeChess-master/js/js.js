/**
 * Created by David on 3/22/2017.
 */

$( document ).ready(function() {

    GAME.playerTurn = "White";
    document.getElementById('player_turn').innerText = GAME.playerTurn;
    document.getElementById('turn_number').innerText = GAME.turnNumber.toString();
    genBoard();
    drawPieces();

    var clickCounter = 0;
    var selectedPiece;

    var checkEnemy;
    $('.gridsquare').click(function() {
        document.getElementById('error').innerText = "";
        var square = this;


        var piece = $('div#' + square.id + ' img');








        checkEnemy = false;



                if (clickCounter < 1) {

                    var pawnColour = piece[0].id.substr(5, 8).replace(/[_0-9]+$/, '');
                    var bishopColour = piece[0].id.substr(7).replace(/[_0-9]+$/, '');
					
					console.log(bishopColour);


                    if (GAME.playerTurn == "White" && pawnColour == "White" ||
                        GAME.playerTurn == "White" && bishopColour == "White"||
                        GAME.playerTurn == "Black" && pawnColour == "Black" ||
                        GAME.playerTurn == "Black" && bishopColour == "Black" ) {

                        if (piece[0] != null) {

                            showPossibleMoves(square, piece[0]);
                            checkEnemy = true;
                            clickCounter++;
                        }
                    }
                    else {
                        document.getElementById('error').innerText = "It is not " + piece[0].id.substr(5, 8).replace(/[_0-9]+$/, '') + "'s turn!";
                    }
                }
                else {

                    var allowedTake = allowTake(piece[0], square);
                    if(allowedTake == true)
                    {
                        takePiece(selectedPiece[0], square, piece[0]);
                        nextMove();
                       // console.log("ATTACKER: " + selectedPiece[0].id);
                     //   console.log("DEFENDER: " + piece[0].id);
                    }
                    else
                    {
                        var allowedMove = allowMove(piece[0], square);

                        if (allowedMove == true) {


                            movePiece(square, selectedPiece[0], selectedPiece[0].alt.substr(5).replace(/[_0-9]+$/, ''));
                            nextMove();

                        }
                        else {
                            document.getElementById('error').innerText = "Move not allowed!";

                        }
                    }


                    revertColors();
                    clickCounter = 0;

                }


            targetSquare(square);
            getInfo(square);
            selectedPiece = piece;



        if(checkEnemy == true) {
            checkEnemyNear(square, piece[0]);
        }
        else
        {
            revertColors();
        }
    });


    $('.gridsquare').hover(function(){


        var square = this;

        highlightSquare(square);

    });







});


function nextMove(){

    GAME.turnNumber = GAME.turnNumber + 1;
    document.getElementById('turn_number').innerText = GAME.turnNumber.toString();

    if (GAME.playerTurn == "White")
        GAME.playerTurn = "Black";
    else
        GAME.playerTurn = "White";

    document.getElementById('player_turn').innerText = GAME.playerTurn;

}

var GAME = game;

var columns = ["a", "b", "c","d", "e", "f", "g", "h"];
var rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
var colSize = columns.length;

var totalSize = columns.length * rows.length;

var selected;
var originalColor;

//black pawns

var pawn0B = pawnBlack0;
var pawn1B = pawnBlack1;
var pawn2B = pawnBlack2;
var pawn3B = pawnBlack3;
var pawn4B = pawnBlack4;
var pawn5B = pawnBlack5;
var pawn6B = pawnBlack6;
var pawn7B = pawnBlack7;




//white pawns


var pawn0W = pawnWhite0;
var pawn1W = pawnWhite1;
var pawn2W = pawnWhite2;
var pawn3W = pawnWhite3;
var pawn4W = pawnWhite4;
var pawn5W = pawnWhite5;
var pawn6W = pawnWhite6;
var pawn7W = pawnWhite7;







var whitePawns = [pawn0W, pawn1W, pawn2W, pawn3W, pawn4W, pawn5W, pawn6W, pawn7W];
var blackPawns = [pawn0B, pawn1B, pawn2B, pawn3B, pawn4B, pawn5B, pawn6B, pawn7B];

//bishops


var bishop0W = bishopWhite0;
var bishop1W = bishopWhite1;
var bishop0B = bishopBlack0;
var bishop1B = bishopBlack1;

var whiteBishops = [bishop0W, bishop1W];

var blackBishops = [bishop0B, bishop1B];





var squares = document.getElementsByClassName('gridsquare');

function findSquareIndex(square)
{
    for(var i = 0; i < squares.length; i++)
    {
        if(squares[i] == square)
        {
           // window.console.log(i);
            return i;


        }


    }

}

function findPiece(piece, color)
{

    var pieceNamePawn = piece.id.substr(0, 4);
    var pieceNameBishop = piece.id.substr(0, 6);

    if(pieceNamePawn == "Pawn") {
        if (color == "White") {

            for (var i = 0; i < whitePawns.length; i++) {

                if (piece.id.substr(11) == i) {

                    return whitePawns[i];
                }


            }


        }

        if (color == "Black") {


            for (var i = 0; i < blackPawns.length; i++) {


                if (piece.id.substr(12) == i) {

                    return blackPawns[i];
                }


            }

        }
    }

    if(pieceNameBishop == "Bishop")
    {

        if (color == "White") {

            for (var i = 0; i < whiteBishops.length; i++) {

                if (piece.id.substr(12) == i) {

                    return whiteBishops[i];
                }


            }


        }

        if (color == "Black") {


            for (var i = 0; i < blackBishops.length; i++) {


                if (piece.id.substr(11) == i) {

                    return blackBishops[i];
                }


            }

        }


    }







}

function checkEnemyNear(square, piece)
{

    var sqInd = findSquareIndex(square);
    var pieceCol = piece.id.substr(5, 11).replace(/[_0-9]+$/, '');
    var pieceName = piece.id.substr(0, 4);


    if(pieceName == "Pawn") {

        if(pieceCol == "Black") {
            for (var i = 0; i < squares.length; i++) {
                if (squares[i].id == square.id) {



                    if(square.id.substr(0).replace(/[_0-9]+$/, '') != "a") {
                        var leftEnemyBlack = $('div#' + squares[i - 7].id + ' img');


                        if(leftEnemyBlack[0] != null && leftEnemyBlack[0].id.substr(5).replace(/[_0-9]+$/, '') == "White")
                        {

                           // console.log("SQUARE IMG ID left = " + leftEnemyBlack[0].id);
                            origColorShown.push(squares[i - 7].style.backgroundColor);
                            squares[i - 7].style.backgroundColor = "#660000";
                            squaresShown.push( squares[i - 7]);

                        }

                    }
                    if(square.id.substr(0).replace(/[_0-9]+$/, '') != "h") {
                        var rightEnemyBlack = $('div#' + squares[i + 9].id + ' img');




                        if(rightEnemyBlack[0] != null && rightEnemyBlack[0].id.substr(5).replace(/[_0-9]+$/, '') == "White")
                        {



                           // console.log("SQUARE IMG ID right = " + rightEnemyBlack[0].id);
                            origColorShown.push(squares[i + 9].style.backgroundColor);
                            squares[i + 9].style.backgroundColor = "#660000";
                            squaresShown.push( squares[i + 9]);

                        }



                    }



                    //break;
                }


            }
        }
        else
        {
            for (var i = 0; i < squares.length; i++) {
                if (squares[i].id == square.id) {


                    if(square.id.substr(0).replace(/[_0-9]+$/, '') != "a") {
                        var leftEnemyWhite = $('div#' + squares[i - 9].id + ' img');

                        if(leftEnemyWhite[0] != null && leftEnemyWhite[0].id.substr(5).replace(/[_0-9]+$/, '') == "Black")
                        {


                            origColorShown.push(squares[i - 9].style.backgroundColor);
                            squares[i - 9].style.backgroundColor = "#660000";
                            squaresShown.push( squares[i - 9]);
                        }

                    }
                    if(square.id.substr(0).replace(/[_0-9]+$/, '') != "h") {
                        var rightEnemyWhite = $('div#' + squares[i + 7].id + ' img');

                        if(rightEnemyWhite[0] != null && rightEnemyWhite[0].id.substr(5).replace(/[_0-9]+$/, '') == "Black")
                        {



                            origColorShown.push(squares[i + 7].style.backgroundColor);
                            squares[i + 7].style.backgroundColor = "#660000";
                            squaresShown.push( squares[i  + 7]);

                        }

                    }






                    }
                   // break;
                }



        }
    }




}



function takePiece(attacker, squareDefender, defender){

    var blackTaken = document.getElementById('blackPiecesTaken');
    var whiteTaken = document.getElementById('whitePiecesTaken');


    for(var i = 0; i < squares.length; i++)
    {

        if(squares[i] == squareDefender)
        {
            squares[i].getElementsByTagName('img')[0].remove();
            squares[i].append(attacker);

            if(defender.id.substr(5, 11).replace(/[_0-9]+$/, '') == "White")
            {
                whiteTaken.append(defender);
            }
            else
            {
                blackTaken.append(defender);
            }




        }

    }




}

var enemyColShownRgb = "rgb(102, 0, 0)";

function allowTake(piece, square)
{

    if(piece != null && square.style.backgroundColor == enemyColShownRgb)
    {
        return true;
    }
    else
    {

        return false;
    }
}

function allowMove(piece, square){



    if(piece == null && square.style.backgroundColor == shownColRgb)
    {
        return true;
    }
    else
    {

        return false;
    }





}




function movePiece(square, piece, color)
{

    if(square.style.backgroundColor == shownColRgb)
    {
        if(color == "Black" && piece.alt.substr(0,4) == "Pawn")
        {

            for(var i = 0; i < squares.length; i++)
            {

                if(squares[i] == square)
                {

                    if(squares[i - 1].getElementsByTagName('img')[0] != null )
                    {
                        squares[i - 1].getElementsByTagName('img')[0].remove();
                        break;
                    }
                    else
                    {
                        squares[i - 2].getElementsByTagName('img')[0].remove();
                        break;
                    }
                }

            }

            for(var j = 0; j < piecesBlack.length; j++)
            {
                if(piecesBlack[j].alt.substr(10) == piece.alt.substr(10))
                {

                    square.appendChild(piecesBlack[j]);
                    blackPawns[j].moveCount =  blackPawns[j].moveCount + 1;


                    break;
                }

            }






        }

        if(color == "White")
        {
            for(var i = 0; i < squares.length; i++)
            {

                if(squares[i] == square)
                {

                    if(squares[i + 1].getElementsByTagName('img')[0] != null )
                    {
                        squares[i + 1].getElementsByTagName('img')[0].remove();
                        break;
                    }
                    else
                    {
                        squares[i + 2].getElementsByTagName('img')[0].remove();
                        break;
                    }
                }

            }

            for(var j = 0; j < piecesBlack.length; j++)
            {
                if(piecesWhite[j].alt.substr(10) == piece.alt.substr(10))
                {
                    square.appendChild(piecesWhite[j]);
                    whitePawns[j].moveCount =  whitePawns[j].moveCount + 1;

                    break;
                }

            }

        }

    }




}

//ROWS GO DOWN BY 1
//COLUMNS --> +8
//<--- COLUMBS -8

var squaresShown = [];

var origColorShown = [];

var shownCol = "#99e699";
var shownColRgb = "rgb(153, 230, 153)";

var blackPawnMoves =[0,0,0,0,0,0,0,0];
	var whitePawnMoves =[0,0,0,0,0,0,0,0];


function showPossibleMoves(square, piece)
{
    var squareID = square.id;
    var pieceID = piece.id;
	var pieceNum = piece.id.substr(10);
    //pawn
    var pieceNamePawn = pieceID.substr(0, 4);
    var pieceColPawn = pieceID.substr(5, 11).replace(/[_0-9]+$/, '');
	

    //bishop

    var pieceNameBishop = pieceID.substr(0, 6);
    var pieceColBishop =  pieceID.substr(7).replace(/[_0-9]+$/, '');


    var sqInd = findSquareIndex(square);

    //PAWN
	

    if( pieceNamePawn == "Pawn")
    {
		
		console.log(piece, pieceColPawn);
		

        var thisPawn = findPiece(piece, pieceColPawn);
		if(pieceColPawn == "Black") {

				origColorShown.push(squares[sqInd + thisPawn.rowMoves].style.backgroundColor);
				squaresShown.push(squares[sqInd + (thisPawn.rowMoves)]);
				squares[sqInd + thisPawn.rowMoves].style.backgroundColor = shownCol;
		   
				if(blackPawnMoves[pieceNum] < 1) {
					origColorShown.push(squares[sqInd + (thisPawn.rowMoves + 1)].style.backgroundColor);
					squaresShown.push(squares[sqInd + (thisPawn.rowMoves + 1)]);
					squares[sqInd + (thisPawn.rowMoves + 1)].style.backgroundColor = shownCol;												
					blackPawnMoves[pieceNum] += 1;
				}
             
			}

        else{
  
				origColorShown.push(squares[sqInd + (thisPawn.rowMoves - 2)].style.backgroundColor);

				squaresShown.push(squares[sqInd + (thisPawn.rowMoves - 2)]);
				squares[sqInd + (thisPawn.rowMoves - 2)].style.backgroundColor = shownCol;


				if (whitePawnMoves[pieceNum] < 1) {

					origColorShown.push(squares[sqInd + (thisPawn.rowMoves - 3)].style.backgroundColor);
					squaresShown.push(squares[sqInd + (thisPawn.rowMoves - 3)]);
					squares[sqInd + (thisPawn.rowMoves - 3)].style.backgroundColor = shownCol;
					
					whitePawnMoves[pieceNum] += 1;
				}
    
        }
    }

    //BISHOP

  if( pieceNameBishop == "Bishop") {

        var thisBishop = findPiece(piece, pieceColBishop);

        if (pieceColBishop == "Black") {


            for (var i = 0; i < blackBishops.length; i++) {
                if (blackBishops[i] == thisBishop) {

                    var possibleSquarePlusBlack = $('div#' + squares[sqInd + i].id + ' img');
                    var possibleSquareNegBlack = $('div#' + squares[sqInd - i].id + ' img');
                        console.log(possibleSquarePlusBlack.id);
                    if (possibleSquarePlusBlack == null) {
                        squares[sqInd + i].style.backgroundColor = shownCol;
                   

                    }
                    console.log(possibleSquareNegBlack.id);
                    if (possibleSquareNegBlack == null) {
                        squares[sqInd - i].style.backgroundColor = shownCol;
                 
                    }
                }

            }
        }
        else {
            for (var i = 0; i < whiteBishops.length; i++) {

                if (whiteBishops[i] == thisBishop) {


				
                    //Top Right
                    for (var j = 0; j + sqInd < squares.length; j = j+7) {
						
						

						console.log(squares[sqInd + j].firstElementChild);

                        if(squares[sqInd + j].firstElementChild != null) {

                            var possibleSquareTopRightWhite = $('div#' + squares[(sqInd + j)].id + ' img');

                            try {
                                if (possibleSquareTopRightWhite[0].alt == "") {
                                    squares[sqInd + j].style.backgroundColor = shownCol;
                                }

                            }
                            catch(e)
                            {
                                squares[sqInd + j].style.backgroundColor = shownCol;
                            }



                        }
				
                    }
					
					var indexDiff = squares.length - sqInd;
					
					console.log(indexDiff);

                    //Bottom-Left
                    for (var j = 63; j + sqInd > 0; j = j - 7) {


						
                        if(squares[sqInd - j].firstElementChild != null) {
                            var possibleSquareBottomLeftWhite = $('div#' + squares[(sqInd - j)].id + ' img');

                            try {
                                if (possibleSquareBottomLeftWhite[0].alt == "") {
                                    squares[sqInd - j].style.backgroundColor = shownCol;
                                }

                            }
                            catch(e)
                            {
                                squares[sqInd - j].style.backgroundColor = shownCol;
                            }
                        }
                    }

                    //Top-Left
                    for (var j = 63; j - sqInd > 0; j = j - 9) {




                        if(squares[sqInd - j].firstElementChild != null) {
                            var possibleSquareTopLeftWhite = $('div#' + squares[(sqInd - j)].id + ' img');

                            try {
                                if (possibleSquareTopLeftWhite[0].alt == "") {
                                    squares[sqInd - j].style.backgroundColor = shownCol;
                                }

                            }
                            catch(e)
                            {
                                squares[sqInd - j].style.backgroundColor = shownCol;
                            }
                        }
                    }

                    //Bottom-Right
                    for (var j = 0; j  +sqInd < squares.length; j = j + 9) {



                        if(squares[sqInd + j].firstElementChild != null) {
                            var possibleSquareBottomRight = $('div#' + squares[(sqInd + j)].id + ' img');

                            try {
                                if (possibleSquareBottomRight[0] == "") {
                                    squares[sqInd - j].style.backgroundColor = shownCol;
                                }

                            }
                            catch(e)
                            {
                                squares[sqInd - j].style.backgroundColor = shownCol;
                            }

                        }

                    }







                }
				

            }


        }
    }



}


function revertColors()
{


    if(squaresShown != null)
    {
        for(var i =0; i < squaresShown.length; i++) {
            squaresShown[i].style.backgroundColor = origColorShown[i];


        }

        squaresShown = [];
        origColorShown = [];
    }





}

function targetSquare(square){

    if(selected != null)
    {
        selected.style.backgroundColor = originalColor;
    }

    originalColor = square.style.backgroundColor;
    square.style.backgroundColor = "#7A7A7A";

    selected = square;


}

var selectedHi;
var originalHi;

function highlightSquare(square){

    if(selectedHi != null)
    {
        selectedHi.style.border = originalHi;
    }

    originalHi = square.style.border;
    square.style.border = " 0.2px solid red";

    selectedHi = square;


};


function getInfo(selected){


    var square;
    var piece;

    var selectedSquare = document.getElementById('selected_square');
    var selectedPiece = document.getElementById('selected_piece');


    square = selected.id;
   piece = $('div#' + square + ' img');

   if(piece.length < 1)
   {
       selectedPiece.innerText = "";
   }
   else
   {
       for(var i =0; i < piece.length; i++)
       {

           selectedPiece.innerText = piece[0].alt;

       }
   }



    selectedSquare.innerText = square;






}


function genBoard(){




    var flip = false;


    var e = document.getElementById('board'); // whatever you want to append the rows to:


    var rowTitle = document.createElement("div");
    var colTitle = document.createElement("div");
    rowTitle.name = "numbers";
    colTitle.name = "letters";


   
    var colP =  document.createElement("div");

    //col titles

    for(var i = 0; i < colSize; i++)
    {
        colP.innerHTML += "<span style = 'margin-right: 42.5px;'>" + columns[i].toUpperCase() + "</span>" ;


    }


    colTitle.appendChild(colP);
    colTitle.style.marginLeft = "30px";

	 var rowP =  document.createElement("div");

    //row Titles
    var lineBreak = "<br><br><br>";
    for(var i = 0; i < colSize; i++)
    {
		var rowReal =  document.createElement("div");
        rowReal.innerText += rows[i];
		rowReal.style.marginTop = "30px";
        rowP.appendChild(rowReal);

    }

    rowP.style.marginTop = "5px";




    rowTitle.appendChild(rowP);
    rowTitle.style.float = "left";
    rowTitle.style.height = "402px";
    rowTitle.style.marginRight = "10px";


    e.appendChild(colTitle);
    e.appendChild(rowTitle);


    for(var i = 0; i < colSize; i++){
        var row = document.createElement("div");
        row.className = "row";
        row.style.border = "0.2px solid #CCCCCC";
        for(var x = 0; x <  colSize; x++){
            var cell = document.createElement("div");
            cell.className = "gridsquare";
            cell.id = columns[i] + rows[x];
            cell.style.width = "50px";
            cell.style.height = "50px";
            cell.style.border = "0.2px solid #CCCCCC";



           // var text =  ;

           // alert(text);

            if(x % 8 == 0) {
                row.style.float = "left";
                if(flip == false) {
                    flip = true;
                }
                else{
                    flip = false
                }
            }



            if(flip == true)
            {
                if (x % 2 == 0) {

                    cell.style.backgroundColor = "#323232";
                    cell.style.color = "white";

                }
            }
            else{
                if (x % 2 == 1) {

                    cell.style.backgroundColor = "#323232";
                    cell.style.color = "white";

                }
            }




            row.appendChild(cell);
        }




        e.appendChild(row);

    }


}

var createImage = function(src, title) {
    var img = document.createElement("img");
    img.src   = "../img/"+ src + ".png";
    img.alt   = title;
    img.title = title;
    img.id = title;
    img.style.width = "50px";
    img.style.height = "50px";

    return img;
};

var piecesBlack = [];
var piecesWhite = [];

//black pieces
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black0")); //0
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black1")); //1
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black2")); //2
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black3")); //3
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black4")); //4
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black5")); //5
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black6")); //6
piecesBlack.push(createImage("Pawn_Black", "Pawn_Black7")); //7


piecesBlack.push(createImage("Knight_Black", "Knight_Black0")); //8
piecesBlack.push(createImage("Knight_Black", "Knight_Black1")); //9

piecesBlack.push(createImage("Rook_Black", "Rook_Black0")); //10
piecesBlack.push(createImage("Rook_Black", "Rook_Black1")); //11

piecesBlack.push(createImage("Bishop_Black", "Bishop_Black0")); //12
piecesBlack.push(createImage("Bishop_Black", "Bishop_Black1")); //13

piecesBlack.push(createImage("Queen_Black", "Knight_Black0")); //14
piecesBlack.push(createImage("King_Black", "King_Black1")); //15


//white pieces
piecesWhite.push(createImage("Pawn_White", "Pawn_White0")); //0
piecesWhite.push(createImage("Pawn_White", "Pawn_White1")); //1
piecesWhite.push(createImage("Pawn_White", "Pawn_White2")); //2
piecesWhite.push(createImage("Pawn_White", "Pawn_White3")); //3
piecesWhite.push(createImage("Pawn_White", "Pawn_White4")); //4
piecesWhite.push(createImage("Pawn_White", "Pawn_White5")); //5
piecesWhite.push(createImage("Pawn_White", "Pawn_White6")); //6
piecesWhite.push(createImage("Pawn_White", "Pawn_White7")); //7

piecesWhite.push(createImage("Knight_White", "Knight_White0")); //8
piecesWhite.push(createImage("Knight_White", "Knight_White1")); //9

piecesWhite.push(createImage("Rook_White", "Rook_White0")); //10
piecesWhite.push(createImage("Rook_White", "Rook_White1")); //11

piecesWhite.push(createImage("Bishop_White", "Bishop_White0")); //12
piecesWhite.push(createImage("Bishop_White", "Bishop_White1")); //13

piecesWhite.push(createImage("Queen_White", "Queen_White0")); //14
piecesWhite.push(createImage("King_White", "King_White1"));//15

function drawPieces()
{




            //black pieces
                //Rook
                $('#a8').append(piecesBlack[10]);
                //Pawn 0
                $('#a7').append(piecesBlack[0]);
                //Knight 0
                $('#b8').append(piecesBlack[8]);
                //Pawn 1
                $('#b7').append(piecesBlack[1]);
                //Bishop 0
                $('#c8').append(piecesBlack[12]);
                //Pawn 2
                $('#c7').append(piecesBlack[2]);
                //Queen
                $('#d8').append(piecesBlack[14]);
                //Pawn 3
                $('#d7').append(piecesBlack[3]);
                //King
                $('#e8').append(piecesBlack[15]);
                //Pawn 4
                $('#e7').append(piecesBlack[4]);
                //Bishop 1
                $('#f8').append(piecesBlack[13]);
                //Pawn 5
                $('#f7').append(piecesBlack[5]);
                //Knight 1
                $('#g8').append(piecesBlack[9]);
                //Pawn 6
                $('#g7').append(piecesBlack[6]);
                //Rook 1
                $('#h8').append(piecesBlack[11]);
                //Pawn 7
                $('#h7').append(piecesBlack[7]);


            //white pieces
                //Rook
                $('#a1').append(piecesWhite[10]);
                //Pawn 0
                $('#a2').append(piecesWhite[0]);
                //Knight 0
                $('#b1').append(piecesWhite[8]);
                //Pawn 1
                $('#b2').append(piecesWhite[1]);
                //Bishop 0
                $('#c1').append(piecesWhite[12]);
                //Pawn 2
                $('#c2').append(piecesWhite[2]);
                //Queen
                $('#d1').append(piecesWhite[14]);
                //Pawn 3
                $('#d2').append(piecesWhite[3]);
                //King
                $('#e1').append(piecesWhite[15]);
                //Pawn 4
                $('#e2').append(piecesWhite[4]);
                //Bishop 1
                $('#f1').append(piecesWhite[13]);
                //Pawn 5
                $('#f2').append(piecesWhite[5]);
                //Knight 1
                $('#g1').append(piecesWhite[9]);
                //Pawn 6
                $('#g2').append(piecesWhite[6]);
                //Rook 1
                $('#h1').append(piecesWhite[11]);
                //Pawn 7
                $('#h2').append(piecesWhite[7]);










}
