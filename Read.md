pip install -r requirements.txt

for update 
pip freeze > requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver (Run Backend)