# Apache-Sudoku-Game
This reposiory is for an apache sudoku game, designed to be hosted locally and played on a browser via localhost.
Steps to install and configure:
1. Before downloading this project, install apache on your Ubuntu system with the command apt-install apache2
2. Download the proper files from this repository
3. On your local machine, navigate to /var/www/html
4. Remove any pre-existing files in this directory
5. Move the downloaded files into this directory using the mv command
   The syntax for this is: mv /path to file /path to current directory.
6. Run the command systemctl reload apache2 (if apache is already started)
7. If apache is not already started, run: systemctl start apache2
8. In your browser navigate to localhost or your machines ip address and enjoy the game.
