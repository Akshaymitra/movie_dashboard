"""
Movie Data Cleaning Module

This module provides a function to clean movie data from a given CSV file. The function performs the following steps:

1. Loads the CSV file into a DataFrame.
2. Converts the 'Gross' column values from string format (e.g., '$75.47M') to float.
3. As Gross column has 88 % values missing , instead of removing these rows the function replaces the null values with 0 to avoid problems in future.
4. As only 8% of the rows are blank for these columns the function drops rows where 'RATING', 'VOTES', or 'RunTime' columns are blank (null).
5. Converts 'VOTES' column values to integers by removing commas.
6. Ensures 'RATING' column values are float.
7. Converts 'RunTime' column values to integers.
8. Converts 'YEAR' column values to datetime format and extracts the year.
9. Saves the cleaned DataFrame to a new CSV file named 'cleaned_data.csv'.

Function:
- clean_movie_data(csv_file): Cleans the movie data from the specified CSV file.

Usage:
    cleaned_df = clean_movie_data('data.csv')
    print("Cleaned DataFrame:")
    print(cleaned_df.head())
"""
import pandas as pd


def clean_movie_data(csv_file):
    """
    Cleans the movie data from a given CSV file.

    Parameters:
    csv_file (str): Path to the CSV file containing the movie data.

    Returns:
    pd.DataFrame: Cleaned DataFrame.
    """
    # Load the CSV file
    df = pd.read_csv(csv_file)

    # Function to preprocess the string format in the column and convert to float format . Example: this function will convert $75.47M to 75.47
    def convert_gross(gross_str):
        if pd.isna(gross_str):
            return 0.0
        return float(gross_str.replace("$", "").replace("M", "")) * 1e6

    # Apply the conversion function to the Gross column
    df["Gross"] = df["Gross"].apply(convert_gross)

    # Drop rows where Votes, Rating, or RunTime columns are blank
    df = df.dropna(subset=["RATING", "VOTES", "RunTime"])

    # Convert Votes to integer (removing commas)
    df["VOTES"] = df["VOTES"].str.replace(",", "").astype(int)

    # Ensure Rating is float
    df["RATING"] = df["RATING"].astype(float)

    # Convert RunTime to integer
    df["RunTime"] = df["RunTime"].astype(int)

    # Convert YEAR to datetime format and extract the year
    df["YEAR"] = pd.to_datetime(df["YEAR"], format="%Y").dt.year

    # Save the cleaned data to a new CSV file
    cleaned_csv_file = "cleaned_data.csv"
    df.to_csv(cleaned_csv_file, index=False)

    print(f"Cleaned data saved to '{cleaned_csv_file}'.")

    return df


# Example usage
cleaned_df = clean_movie_data("data.csv")
print("Cleaned DataFrame:")
print(cleaned_df.head())
