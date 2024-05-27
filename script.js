let difficolta;
let fazione;
let winPlayer;
$('.facile_container #facile').hover(function(){
  $('.cartello_facile').addClass('img-animata');
}, function(){
  // Rimuovi la classe quando esci dall'elemento
  $('.cartello_facile').removeClass('img-animata');
});

$('.medio_container #medio').hover(function(){
  $($('.cartello_medio')).addClass('img-animata');
}, function(){
  // Rimuovi la classe quando esci dall'elemento
  $($('.cartello_medio')).removeClass('img-animata');
});
$('.difficile_container #difficile').hover(function(){
  $($('.cartello_difficile')).addClass('img-animata');
}, function(){
  // Rimuovi la classe quando esci dall'elemento
  $($('.cartello_difficile')).removeClass('img-animata');
});
$('.anteprima').click(function() {
  if($(this).data('value') === 'orcs-anteprima'){
    $('.anteprima-pezzi-orcs').css('display', 'flex');
  }
  if($(this).data('value') === 'elfs-anteprima'){
    $('.anteprima-pezzi-elfs').css('display', 'flex');
  }
});

$('.chiudi-anteprima').click(function() {
  $('.anteprima-pezzi-orcs').css('display', 'none');
  $('.anteprima-pezzi-elfs').css('display', 'none');
  
});

$('.stemma_orco').click(function() {
  let scacchiera = $('#scacchiera');
  scacchiera.css('display', 'flex');
  $("#fazione").css('display', 'none');
  fazione = 'orchi'
  startGame(difficolta);
  let imgPlayer = document.createElement('img');
  // Imposta l'attributo src con il percorso dell'immagine
  imgPlayer.src = `./images/stemma_${fazione}.jpg`;
  // Imposta l'attributo alt con una descrizione appropriata
  imgPlayer.alt = 'stemma orco';
  $('.player').append(imgPlayer);
});
$('.stemma_elfo').click(function() {
  let scacchiera = $('#scacchiera');
  scacchiera.css('display', 'flex');
  $("#fazione").css('display', 'none');
  fazione = 'elfi'
  startGame(difficolta);
  let imgPlayer = document.createElement('img');
  // Imposta l'attributo src con il percorso dell'immagine
  imgPlayer.src = `./images/stemma_${fazione}.jpg`;
  // Imposta l'attributo alt con una descrizione appropriata
  imgPlayer.alt = 'stemma orco';
  $('.player').append(imgPlayer);
});
// Aggiungi un listener per l'evento 'change' sull'elemento di input
$('#difficult img').click(function() {
  $('.difficult').empty();
  $('.square').find('img').remove();
  // Ottieni il valore selezionato
  let difficultyValue = $(this).data('value');
  // Utilizza uno switch per gestire diversi livelli di difficoltà
  switch(difficultyValue) {
   
    case 'facile':
      $("#difficult").hide();
      $("#fazione").css('display', 'flex');
      difficolta = 5;
      break;
    case 'medio':
      // Codice per il livello di difficoltà medio
    $("#difficult").hide();
      $("#fazione").css('display', 'flex');
      difficolta = 10;
      break;
    case 'difficile':
      // Codice per il livello di difficoltà difficile
      $("#difficult").hide();
      $("#fazione").css('display', 'flex');
      difficolta = 20;
      break;
  }


  let imgComputer = document.createElement('img');
  let immagine = difficolta === 5 ? 'undead' : difficolta === 10 ? 'draghi' : difficolta === 20 ? 'troll' : '';
  // Imposta l'attributo src con il percorso dell'immagine
  imgComputer.src = `./images/stemma_${immagine}.jpg`;
  // Imposta l'attributo alt con una descrizione appropriata
  imgComputer.alt = `stemma ${immagine}`;
  $('.difficult').append(imgComputer);
 
});

$('.menu').click(function() {
  $('#difficult').css('display', 'flex');
  $('#scacchiera').hide();
  $('#fazione').hide();
});


let game; // Inizializza il gioco
let stockfish = new Worker('./stockfish/src/stockfish-nnue-16-single.js');
function startGame(difficolta, callByResetButton = false){
  winPlayer = false;
  if(!callByResetButton){
    $('.overlay-factions').css('display', 'flex');
    $('.player').css('transform', 'translateX(0%)');
    $('.vs').css('opacity', '1');
    $('.difficult').css('transform', 'translateX(0%)');
    setTimeout(() => {
      $('.player').css('transform', 'translateX(-100%)');
      $('.vs').css('opacity', '0');
      $('.difficult').css('transform', 'translateX(+100%)');
    }, 2000);
  
    setTimeout(() => {
      $('.overlay-factions').css('display', 'none');
      $('.difficult').empty();
      $('.player').empty();
    }, 4000);
  
  }
  $('.square').empty();
  $(".square").removeClass("evidenzia");
  $(".square").removeClass("captured_style");
  $('.square').removeClass("mosse_disponibili");

  game = new Chess();
  $('.status').css("display", "none");
  $(".square").removeClass("king_under_attack");
 
  if(difficolta === 5 && fazione ==='orchi'){
    $('.square').each(function () {
      let squareId = $(this).attr('id');
      let piece = game.get(squareId);
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/orchi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/orchi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/orchi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/orchi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/orchi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/orchi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/undead/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/undead/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/undead/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/undead/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/undead/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/undead/pezzi/king.png';
              break;
          }
        }
        $(this).append(`<img src="${imgSrc}">`);
      }
    });
  }
  if(difficolta === 5 && fazione ==='elfi'){
    $('.square').each(function () {
      let squareId = $(this).attr('id');
      let piece = game.get(squareId);

      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/elfi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/elfi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/elfi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/elfi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/elfi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/elfi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/undead/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/undead/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/undead/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/undead/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/undead/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/undead/pezzi/king.png';
              break;
          }
        }
        $(this).append(`<img src="${imgSrc}">`);
      }
    });
  }
  if(difficolta === 10 && fazione ==='orchi'){
    $('.square').each(function () {
      let squareId = $(this).attr('id');
      let piece = game.get(squareId);
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/orchi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/orchi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/orchi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/orchi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/orchi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/orchi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/dragons/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/dragons/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/dragons/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/dragons/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/dragons/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/dragons/pezzi/king.png';
              break;
          }
        }
        $(this).append(`<img src="${imgSrc}">`);
      }
    });
  }
  if(difficolta === 10 && fazione ==='elfi'){
    $('.square').each(function () {
      let squareId = $(this).attr('id');
      let piece = game.get(squareId);

      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/elfi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/elfi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/elfi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/elfi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/elfi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/elfi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/dragons/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/dragons/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/dragons/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/dragons/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/dragons/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/dragons/pezzi/king.png';
              break;
          }
        }
        $(this).append(`<img src="${imgSrc}">`);
      }
    });
  }
  if(difficolta === 20 && fazione ==='orchi'){
    $('.square').each(function () {
      let squareId = $(this).attr('id');
      let piece = game.get(squareId);
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/orchi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/orchi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/orchi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/orchi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/orchi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/orchi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/troll/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/troll/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/troll/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/troll/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/troll/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/troll/pezzi/king.png';
              break;
          }
        }
        $(this).append(`<img src="${imgSrc}">`);
      }
    });
  }
  if(difficolta === 20 && fazione ==='elfi'){
    $('.square').each(function () {
      let squareId = $(this).attr('id');
      let piece = game.get(squareId);

      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/elfi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/elfi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/elfi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/elfi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/elfi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/elfi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/troll/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/troll/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/troll/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/troll/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/troll/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/troll/pezzi/king.png';
              break;
          }
        }
        $(this).append(`<img src="${imgSrc}">`);
      }
    });
  }

  
  addDrag();
}

$('.reset').click(function(){
  $('.square img').css('transition', '0.5s');
  $('.square img').css('opacity', '0');
  $('.board').css('opacity', '0.5'); 
  setTimeout(() => {
    startGame(difficolta , true);
    $('.square img').css('opacity', '1');
    $('.board').css('opacity', '1');
  }, 1000);
})

function chessboardCell(row, col) {
  let lettera = 'a';
  let numero = '8';
  if(row === 2){
    numero='7';
  }
  if(row === 3){
    numero='6';
  }
  if(row === 4){
    numero='5';
  }
  if(row === 5){
    numero='4';
  }
  if(row === 6){
    numero='3';
  }
  if(row === 7){
    numero='2';
  }
  if(row === 8){
    numero='1';
  }

  if(col === 2){
    lettera='b';
  }
  if(col === 3){
    lettera='c';
  }
  if(col === 4){
    lettera='d';
  }
  if(col === 5){
    lettera='e';
  }
  if(col === 6){
    lettera='f';
  }
  if(col === 7){
    lettera='g';
  }
  if(col === 8){
    lettera='h';
  }

  return lettera + numero;

}
let clone = null;
function addDrag(){
  
  // Inizializza Draggabilly per tutte le immagini nelle caselle della scacchiera
  $('.square img').each(function() {
    let draggie = new Draggabilly(this)
    // Aggiungi qui eventuali callback e logica aggiuntiva
    draggie.on('dragStart', function() {
      clone = $(this.element).clone().appendTo('body').css({
        position: 'absolute',
        left: $(this.element).offset().left,
        top: $(this.element).offset().top,
        opacity: 0.5, // Opacità ridotta
        zIndex: 100000 // Assicura che il clone sia sopra gli altri elementi
      });
      let dragOrigin = $(this.element).parent('.square').attr('id');
      posizionePartenza = dragOrigin;
      $(".square .mosse_disponibili ").remove();
      $(".square").removeClass("evidenzia");
      $(".square").removeClass("captured_style");
      if (game.turn() === 'w') {
        $(`#${dragOrigin}`).addClass('evidenzia');
        const moves = game.moves({ square: dragOrigin, verbose: true });
        moves.forEach((move) => {
          if(move.captured){
            $(`#${move.to}`).addClass('captured_style');
          } else {
            $(`#${move.to}`).append("<div class='mosse_disponibili'></div>");
          }
        });
      }
    });

    draggie.on('dragEnd', function() {
      $(".square .mosse_disponibili ").remove();
      $(".square").removeClass("evidenzia");
      $(".square").removeClass("captured_style");
      
      // Ottieni la posizione della scacchiera
      let boardPosition = $('.board').position();
      let pieceWidth = $(this.element).width();
      let pieceHeight = $(this.element).height();
      // Ottieni le coordinate finali dell'elemento trascinato rispetto alla scacchiera
      let dropPosition = {
        top: $(this.element).position().top + pieceHeight / 2 - boardPosition.top,
        left: $(this.element).position().left + pieceWidth / 2 - boardPosition.left
      };
      const bodyWidth = $("body").outerWidth();
      const bodyHeight = $("body").outerHeight();
      let row ,col;
      // Calcola la riga e la colonna della casella di destinazione
      if(bodyWidth <= 1350 || bodyHeight <= 720 ){
        row = Math.floor(dropPosition.top / 90) + 1; // Aggiungi 1 perché le righe partono da 1 invece che da 0
        col = Math.floor(dropPosition.left / 90) + 1; // Aggiungi 1 perché le colonne partono da 1 invece che da 0
      }else{
        row = Math.floor(dropPosition.top / 105) + 1; // Aggiungi 1 perché le righe partono da 1 invece che da 0
        col = Math.floor(dropPosition.left / 105) + 1; // Aggiungi 1 perché le colonne partono da 1 invece che da 0
      }
      posizioneArrivo = chessboardCell(row,col);
      if (clone !== null) {
        clone.remove();
        clone = null;
      }
      let piece = game.get(posizionePartenza);
      if(piece.type === 'p' && piece.color === 'w'  && posizioneArrivo[1] === '8' && posizionePartenza[1] === '7' || piece.type === 'p' && piece.color === 'b' && posizioneArrivo[1] === '1' && posizionePartenza[1] === '2' ){
        if(fazione === 'elfi'){
          $('.promotion.elfs').css('display','flex');
  
        }else{
          $('.promotion.orcs').css('display','flex');
        }
        $('.promotion img').click(function() {
          let pezzoPromosso = $(this).data('value');
          let move = game.move({
            from: posizionePartenza,
            to: posizioneArrivo,
            promotion: pezzoPromosso 
          });
          $('.promotion').css('display','none');
          updateBoard(posizionePartenza,posizioneArrivo)
           // se la mossa non è valida resetta l'array delle coordinate ed evidenzia un altro pezzo nel caso sia stato cliccato come seconda coordinata
        if (move === null) {
          console.log('Mossa non valida');
          // let puntoArrivo = coordinate[1];
          // coordinate = []; // Resetta l'array delle coordinate se la mossa è invalida
          // if($(`#${puntoArrivo}`).find("img").length > 0){
          //   coordinate.push(puntoArrivo)
          // }
          return;
        }
        });
        
      
      }else{
        let move =game.move({
          from: posizionePartenza,
          to: posizioneArrivo
        });
        if(move === null){
          console.log('mossa non valida')
        }
      }
    
      
      updateBoard(posizionePartenza,posizioneArrivo);

      stockfish.postMessage('position fen ' + game.fen());
      stockfish.postMessage(`go depth ${difficolta}`);
      stockfish.onmessage = function (event) {
        if (game.turn() === 'b') {
          let moveParts = event.data.split(" ");
          if (event.data.includes("info depth")) {
            let parts = event.data.split(" ");
            let scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1) {
                let scoreType = parts[scoreIndex + 1];
                let scoreValue = parseInt(parts[scoreIndex + 2], 10);
        
                // Se c'è un possibile scacco matto in due o tre mosse, Stockfish continua a giocare
                let mateIndex = parts.indexOf("mate");
                if (mateIndex !== -1) {
                    let mateScore = parseInt(parts[mateIndex + 1], 10);
                    if (mateScore >= -2 && mateScore <= 2) {
                        console.log("Possibile scacco matto in due o tre mosse, Stockfish continua a giocare.");
                        return;
                    }
                }
        
                // Se la valutazione della posizione è estremamente negativa o c'è un possibile scacco matto in una mossa, Stockfish si arrende
                if ((scoreType === "cp" && scoreValue <= -5000) || (scoreType === "mate" && scoreValue < 0)) {
                    console.log("Stockfish si arrende.");
                    winPlayer = true;
                    return;
                }
            }
        }
          let bestMoveIndex = moveParts.indexOf("bestmove") + 1;
          let from = moveParts[bestMoveIndex].substring(0, 2);
          let to = moveParts[bestMoveIndex].substring(2);
          let piece = ''; // Inizializziamo una stringa vuota per il pezzo

          // Se la lunghezza della mossa è maggiore di 4, significa che il pezzo è specificato
      
          if (bestMoveIndex !== 0 && bestMoveIndex < moveParts.length) {
            console.log("stockfish muove")
            if (moveParts[bestMoveIndex].length > 4) {
              piece = moveParts[bestMoveIndex][4]; // Estraiamo il pezzo
              let moveTo = to.substring(0, to.length - 1);
              console.log(moveTo)
              setTimeout(() => {
                let move = game.move({
                  from: from,
                  to: moveTo,
                  promotion: piece
                });
              }, 1500);
             
              console.log(move)
              console.log('coordinata partenza' ,from)
              console.log('coordinata arrivo' ,moveTo)
              console.log('pezzo scelto' ,piece)
              updateBoard(from,moveTo);
            }else{
              setTimeout(() => {
                console.log('set timeout 3 secondi else')
                let move = game.move({ from , to });
                if (move !== null) {
                  updateBoard(from,to);
                } else {
                  console.log("Mossa non valida.");
                }
              }, 1500);
              
            }
            
          }
        }
      };
    });
  });
}


let posizionePartenza, posizioneArrivo;

let coordinate = [];

// Funzione per verificare se una mossa è valida
function isValidMove(origin, target) {
  let move = game.move({
    from: origin,
    to: target
  });
  console.log('mossa valida',move)
  return move;
}



// // Funzione per ripristinare la posizione originale del pezzo in caso di mossa non valida
// function resetPiecePosition(origin) {
//     // Implementa la logica per ripristinare la posizione del pezzo
//     console.log('mossa non valida')
// }

// se clicchi un quadrato
$('.square').click(function () {

  // pulisci le classi che mostrano il quadrato evidenziato e le mosse disponibili
  $(".square .mosse_disponibili ").remove();
 
  $(".square").removeClass("evidenzia");
  $(".square").removeClass("captured_style");

 
  let squareId = $(this).attr('id'); // Ottieni l'ID della casella del pezzo cliccato
  
  // Se l'array delle coordinate ha già due elementi, svuotalo
  if (coordinate.length === 2) {
    coordinate = [];
  }

  // Se l'array delle coordinate ha solo una coordinata, aggiungi la seconda
  if (coordinate.length === 1) {
    // pusha la seconda coordinata se ne è già presente 1
    coordinate.push(squareId);
    // trova le informazioni del pezzo nella casella di partenza
    let piece = game.get(coordinate[0]);

    // se il pezzo è un pedone che viene promosso fai scegliere all'utente in che pezzo promuoverlo
    if(piece.type === 'p' && piece.color === 'w'  && coordinate[1][1] === '8' && coordinate[0][1] === '7'|| piece.type === 'p' && piece.color === 'b' && coordinate[1][1] === '1' && coordinate[0][1] === '2' ){
      if(fazione === 'elfi'){
        $('.promotion.elfs').css('display','flex');

      }else{
        $('.promotion.orcs').css('display','flex');
      }
      $('.promotion img').click(function() {
        let pezzoPromosso = $(this).data('value');
        console.log(pezzoPromosso); // Stampa il valore aggiuntivo quando l'immagine viene cliccata
        let move = game.move({
          from: coordinate[0],
          to: coordinate[1],
          promotion: pezzoPromosso 
        });
        $('.promotion').css('display','none');
        updateBoard(coordinate[0],coordinate[1])
         // se la mossa non è valida resetta l'array delle coordinate ed evidenzia un altro pezzo nel caso sia stato cliccato come seconda coordinata
      if (move === null) {
        console.log('Mossa non valida');
        let puntoArrivo = coordinate[1];
        coordinate = []; // Resetta l'array delle coordinate se la mossa è invalida
        if($(`#${puntoArrivo}`).find("img").length > 0){
          coordinate.push(puntoArrivo)
        }
        return;
      }
      });
      
    
    }else{
      // se non è una mossa di promozione fai una mossa normale
      let move = game.move({
        from: coordinate[0],
        to: coordinate[1]
      });
      // $(`#${coordinate[0]}`).removeClass("evidenzia");

      if (move === null) {
        // se la mossa normale è invalida controlla se c'è un pezzo nella coordinata di arrivo e imposta la classe evidenzia 
        console.log('Mossa non valida');
        let [puntoPartenza,puntoArrivo] = coordinate;
        coordinate = []; // Resetta l'array delle coordinate se la mossa è invalida
        if($(`#${puntoArrivo}`).find("img").length > 0){
          // se non ci sono coordinate viene pushata e mostra la classe evidenzia con le mosse disponibili
          $(`#${squareId}`).addClass('evidenzia');
          const moves = game.moves({ square: squareId, verbose: true });
          moves.forEach((move) => {
            if(move.captured){
              $(`#${move.to}`).addClass('captured_style');
            }else{
              $(`#${move.to}`).append("<div class='mosse_disponibili'></div>");
      
            }
          });
          coordinate.push(puntoArrivo)
        }
        return;
      }
    }
   
    updateBoard(coordinate[0],coordinate[1]);

    stockfish.postMessage('position fen ' + game.fen());
    stockfish.postMessage(`go depth ${difficolta}`);

    stockfish.onmessage = function (event) {
      if (game.turn() === 'b') {
        let moveParts = event.data.split(" ");
        console.log(event.data)
        if (event.data.includes("info depth")) {
          let parts = event.data.split(" ");
          let scoreIndex = parts.indexOf("score");
          if (scoreIndex !== -1) {
            let scoreType = parts[scoreIndex + 1];
            let scoreValue = parseInt(parts[scoreIndex + 2], 10);
            
            if ((scoreType === "cp" && scoreValue <= -5000) || (scoreType === "mate" && scoreValue < 0)) {
              console.log("Stockfish si arrende.");
              winPlayer = true;

              return;
            }
          }
        }
        let bestMoveIndex = moveParts.indexOf("bestmove") + 1;
        let from = moveParts[bestMoveIndex].substring(0, 2);
        let to = moveParts[bestMoveIndex].substring(2);
        let piece = ''; // Inizializziamo una stringa vuota per il pezzo

        // Se la lunghezza della mossa è maggiore di 4, significa che il pezzo è specificato
     
        if (bestMoveIndex !== 0 && bestMoveIndex < moveParts.length) {
          console.log("stockfish muove")
          if (moveParts[bestMoveIndex].length > 4) {
            piece = moveParts[bestMoveIndex][4]; // Estraiamo il pezzo
            let moveTo = to.substring(0, to.length - 1);
            console.log(moveTo)
            setTimeout(() => {
              let move = game.move({
                from: from,
                to: moveTo,
                promotion: piece
              });
            }, 1500);
          
            console.log(move)
            console.log('coordinata partenza' ,from)
            console.log('coordinata arrivo' ,moveTo)
            console.log('pezzo scelto' ,piece)
            updateBoard(from,moveTo);
          }else{
            setTimeout(() => {
              let move = game.move({ from , to });
              if (move !== null) {
                updateBoard(from,to);
              } else {
                console.log("Mossa non valida.");
              }
            }, 1500);
          }
        }
      }
    };
    
  } else {
    // Verifica se il quadrato contiene un'immagine
    if (!$(this).find("img").length > 0) {
      console.log('clicca un pezzo in una casella');
      return;
    }
    // if (game.turn() === 'w') {
      $(`#${squareId}`).addClass('evidenzia');
      const moves = game.moves({ square: squareId, verbose: true });
      moves.forEach((move) => {
        if(move.captured){
          $(`#${move.to}`).addClass('captured_style');
        }else{
          $(`#${move.to}`).append("<div class='mosse_disponibili'></div>");
  
        }
      });
      coordinate.push(squareId);
    // }
  
  }
});

function updateBoard(mossa1,mossa2) {
  $(".square").removeClass("king_under_attack");
  $('.status').css("display", "none");
  $('.square').empty();
  // Aggiungi i pezzi necessari alla scacchiera
  $('.square').each(function () {
    let squareId = $(this).attr('id');
    let piece = game.get(squareId);
    if(difficolta === 5 && fazione ==='orchi'){
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/orchi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/orchi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/orchi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/orchi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/orchi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/orchi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/undead/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/undead/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/undead/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/undead/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/undead/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/undead/pezzi/king.png';
              break;
          }
        }
        // Se l'ID della cella corrente corrisponde a uno dei pezzi che si muovono, aggiungi l'animazione
        if (squareId === mossa1 || squareId === mossa2) {
        let $img = $('<img>').attr('src', imgSrc).addClass('animated-piece');
          setTimeout(function () {
              $img.css('opacity', '1');
          }, 10);
          $(this).append($img);
        }else{
        $(this).append(`<img src="${imgSrc}">`);
        }
  
         
      }
    }
    if(difficolta === 5 && fazione ==='elfi'){
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/elfi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/elfi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/elfi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/elfi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/elfi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/elfi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/undead/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/undead/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/undead/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/undead/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/undead/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/undead/pezzi/king.png';
              break;
          }
        }
        // Se l'ID della cella corrente corrisponde a uno dei pezzi che si muovono, aggiungi l'animazione
        if (squareId === mossa1 || squareId === mossa2) {
        let $img = $('<img>').attr('src', imgSrc).addClass('animated-piece');
          setTimeout(function () {
            $img.css('opacity', '1');
          }, 10);
          $(this).append($img);
        }else{
        $(this).append(`<img src="${imgSrc}">`);
        }
  
         
      }
    }

    if(difficolta === 10 && fazione ==='orchi'){
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/orchi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/orchi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/orchi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/orchi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/orchi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/orchi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/dragons/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/dragons/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/dragons/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/dragons/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/dragons/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/dragons/pezzi/king.png';
              break;
          }
        }

        // Se l'ID della cella corrente corrisponde a uno dei pezzi che si muovono, aggiungi l'animazione
        if (squareId === mossa1 || squareId === mossa2) {
        let $img = $('<img>').attr('src', imgSrc).addClass('animated-piece');
          setTimeout(function () {
              $img.css('opacity', '1');
          }, 10);
          $(this).append($img);
        }else{
        $(this).append(`<img src="${imgSrc}">`);
        }
      }

    }

    if(difficolta === 10 && fazione ==='elfi'){
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/elfi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/elfi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/elfi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/elfi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/elfi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/elfi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/dragons/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/dragons/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/dragons/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/dragons/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/dragons/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/dragons/pezzi/king.png';
              break;
          }
        }

        // Se l'ID della cella corrente corrisponde a uno dei pezzi che si muovono, aggiungi l'animazione
        if (squareId === mossa1 || squareId === mossa2) {
        let $img = $('<img>').attr('src', imgSrc).addClass('animated-piece');
          setTimeout(function () {
              $img.css('opacity', '1');
          }, 10);
          $(this).append($img);
        }else{
        $(this).append(`<img src="${imgSrc}">`);
        }
      }
          
    }
    if(difficolta === 20 && fazione ==='orchi'){
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/orchi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/orchi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/orchi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/orchi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/orchi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/orchi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/troll/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/troll/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/troll/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/troll/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/troll/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/troll/pezzi/king.png';
              break;
          }
        }
        // Se l'ID della cella corrente corrisponde a uno dei pezzi che si muovono, aggiungi l'animazione
        if (squareId === mossa1 || squareId === mossa2) {
        let $img = $('<img>').attr('src', imgSrc).addClass('animated-piece');
          setTimeout(function () {
              $img.css('opacity', '1');
          }, 10);
          $(this).append($img);
        }else{
        $(this).append(`<img src="${imgSrc}">`);
        }
  
         
      }
    }
    if(difficolta === 20 && fazione ==='elfi'){
      if (piece) {
        let imgSrc;
        if (piece.color === 'w') {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/elfi/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/elfi/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/elfi/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/elfi/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/elfi/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/elfi/pezzi/king.png';
              break;
          }
        } else {
          switch (piece.type) {
            case 'p':
              imgSrc = './images/troll/pezzi/pawn.png';
              break;
            case 'r':
              imgSrc = './images/troll/pezzi/rook.png';
              break;
            case 'q':
              imgSrc = './images/troll/pezzi/queen.png';
              break;
            case 'n':
              imgSrc = './images/troll/pezzi/knight.png';
              break;
            case 'b':
              imgSrc = './images/troll/pezzi/bishop.png';
              break;
            case 'k':
              imgSrc = './images/troll/pezzi/king.png';
              break;
          }
        }
        // Se l'ID della cella corrente corrisponde a uno dei pezzi che si muovono, aggiungi l'animazione
        if (squareId === mossa1 || squareId === mossa2) {
        let $img = $('<img>').attr('src', imgSrc).addClass('animated-piece');
          setTimeout(function () {
              $img.css('opacity', '1');
          }, 10);
          $(this).append($img);
        }else{
        $(this).append(`<img src="${imgSrc}">`);
        }
  
         
      }
    }
  });
  addDrag();
  // Aggiorna lo stato del gioco (opzionale)
  // Trova la posizione dei re
function findKings(board) {
  let kings = {
      w: null, // Posizione del re bianco
      b: null  // Posizione del re nero
  };
  for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
          let piece = board[row][col];
          if (piece && piece.type === 'k') {
              kings[piece.color] = chessboardCell(row + 1, col + 1); // Converti le coordinate della scacchiera
          }
      }
  }
  return kings;
}

// Verifica se il re del giocatore attivo è sotto scacco
let board = game.board();
let kings = findKings(board);
$(".square").removeClass("king_under_attack");
$('.status').css("display", "none");
  if(winPlayer === true ){
    $('.status').css("display", "block");
    $('.status').text(`vincono gli ${fazione} per resa !`)
    $('.square img').css('pointer-events', 'none');
    if(difficolta === 5){
      $('.facile_container .check-win').css('opacity', '1');
    }
    if(difficolta === 10){
      $('.medio_container .check-win').css('opacity', '1');
    }
    if(difficolta === 20){
      $('.difficile_container .check-win').css('opacity', '1');
    }
  }
  if (game.in_checkmate()) {
    console.log('scacco matto')
    $('.status').css("display", "block");
    $('.status').text('scacco matto!')
    $(`#${kings[game.turn()]}`).addClass('king_under_attack')
    if(chess.turn() === 'w'){
      if(difficolta === 5){
        $('.facile_container .check-win').css('opacity', '1');
      }
      if(difficolta === 10){
        $('.medio_container .check-win').css('opacity', '1');
      }
      if(difficolta === 20){
        $('.difficile_container .check-win').css('opacity', '1');
      }
    }
  } else if (game.in_check()) {
    $(`#${kings[game.turn()]}`).addClass('king_under_attack')
  } else if (game.in_draw()) {
    $('.status').css("display", "block");
    $('.status').text('stallo!')
  }
}
