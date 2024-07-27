import pandas as pd
from django.core.management.base import BaseCommand
from movies.models import Movie

class Command(BaseCommand):
    help = 'Load data from CSV file into the database'

    def handle(self, *args, **kwargs):
        df = pd.read_csv('/home/akshay/Desktop/Akshay/assignment/Assignment1/cleaned_data.csv')

        for _, row in df.iterrows():
            movie = Movie(
                title=row['MOVIES'],
                year=row['YEAR'],
                genre=row['GENRE'],
                rating=row['RATING'],
                one_line=row['ONE-LINE'],
                stars=row['STARS'],
                votes=row['VOTES'],
                runtime=row['RunTime'],
                gross=row['Gross']
            )
            movie.save()

        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))
