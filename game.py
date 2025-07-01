import tkinter as tk
from tkinter import messagebox

class TicTacToe:
    def __init__(self, root):
        self.root = root
        self.root.title("Tic-Tac-Toe")
        self.player = "X"
        self.board = [ [None]*3 for _ in range(3) ]
        self.buttons = [ [None]*3 for _ in range(3) ]
        self.create_board()

    def create_board(self):
        for i in range(3):
            for j in range(3):
                btn = tk.Button(self.root, text="", font=('Arial', 40), width=5, height=2,
                                command=lambda row=i, col=j: self.on_click(row, col))
                btn.grid(row=i, column=j)
                self.buttons[i][j] = btn

    def on_click(self, row, col):
        if self.buttons[row][col]['text'] == "" and not self.check_winner():
            self.buttons[row][col]['text'] = self.player
            self.board[row][col] = self.player
            if self.check_winner():
                messagebox.showinfo("Game Over", f"Player {self.player} wins!")
                self.reset_board()
            elif all(all(cell is not None for cell in row) for row in self.board):
                messagebox.showinfo("Game Over", "It's a tie!")
                self.reset_board()
            else:
                self.player = "O" if self.player == "X" else "X"

    def check_winner(self):
        b = self.board
        for i in range(3):
            if b[i][0] == b[i][1] == b[i][2] and b[i][0] is not None:
                return True
            if b[0][i] == b[1][i] == b[2][i] and b[0][i] is not None:
                return True
        if b[0][0] == b[1][1] == b[2][2] and b[0][0] is not None:
            return True
        if b[0][2] == b[1][1] == b[2][0] and b[0][2] is not None:
            return True
        return False

    def reset_board(self):
        self.player = "X"
        self.board = [ [None]*3 for _ in range(3) ]
        for i in range(3):
            for j in range(3):
                self.buttons[i][j]['text'] = ""

# To run the app:
root = tk.Tk()
game = TicTacToe(root)
root.mainloop()