

echo "installing xrdp"
sudo apt-get install xrdp
read -p "Press [Enter] key to start continue..."

echo "installing jenkins"
wget -q -O - https://jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins -y
read -p "Press [Enter] key to start continue..."

echo "installing node"
sudo apt update
sudo apt install build-essential checkinstall libssl-dev
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
read -p "Press [Enter] key to start continue..."
