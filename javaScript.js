class Square {
	constructor(row, column){
		this.row = row;
		this.column = column;
		this.state = "closed";
		this.hasMine = "false";
		this.nearMines = 0;
	}
}

function criaMatriz(row, column){
	let matriz = [];

	for(let i=0; i<row; i++){
		matriz[i] = [];
		for(let j=0; j<column; j++){
			matriz[i][j] = new Square(i, j);
		}
	}

	return matriz;
}
