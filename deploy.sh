cd frontend/

npm install

npm run build

cp dist/index.html ../src/main/resources/templates/
cp -rv dist/static/* ../src/main/resources/static/

cd ../
mvn clean package

cp target/*.jar bin/




