# Apache-Sudoku-Game
This reposiory is for an apache sudoku game, designed to be hosted locally and played on a browser via localhost.
Steps to install and configure:
1. Before downloading this project, install apache on your Ubuntu system with the command apt-install apache2
2. Download the proper files from this repository
3. On your local machine, navigate to /var/www/html
4. Remove any pre-existing files in this directory
5. Move the downloaded files into this directory using the mv command
   The syntax for this is: mv /path to file /path to current directory.
   for the america.jpeg file, first create /var/www/html/images, then move the image file into this directory using the same mv command.
7. Run the command systemctl reload apache2 (if apache is already started)
8. If apache is not already started, run: systemctl start apache2
9. In your browser navigate to localhost or your machines ip address and enjoy the game.
