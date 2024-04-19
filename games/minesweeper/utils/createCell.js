export function createCell(row, col) {
    return {
      row,
      col,
      isBomb: false,
      isRevealed: false,
      isFlagged: false,
      value: 0,
    };
  }