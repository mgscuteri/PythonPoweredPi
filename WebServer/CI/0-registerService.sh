usermod -a -G sudo jenkins
sudo cp PiSite.service /etc/systemd/system/PiSite.service
sudo systemctl start PiSite.service
