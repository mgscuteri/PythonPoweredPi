usermod -a -G sudo jenkins
sudo cp PiSite.service /etc/systemd/system/myscript.service
sudo systemctl start PiSite.service
