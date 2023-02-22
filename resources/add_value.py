# Import the necessary libraries
from __future__ import print_function

import os.path
import google.auth
import google
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import datetime
# Set the credentials for the API
# creds = Credentials.from_authorized_user_info(info=None)

# Get the current date and time
now = datetime.datetime.now()

# Format the date and time as strings
date_str = now.strftime('%Y-%m-%d')
time_str = now.strftime('%H:%M:%S')
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
# Define the data for the new row
row_data = [date_str, time_str, 20, 30, 40]
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
else:
    creds = None
# If there are no (valid) credentials available, let the user log in.
#creds, _ = google.auth.default()
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials.json', SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open('token.json', 'w') as token:
        token.write(creds.to_json())
# Build the service
service = build('sheets', 'v4', credentials=creds)

def main(row_data):
    # Append the row to the sheet
    try:
        spreadsheet_id = '1udwyl--gOwbk8Z003mMpmlvsigm9DooCnTbA_pon7lM'
        range_name = 'Sheet1!A1:F1'
        value_input_option = 'RAW'
        insert_data_option = 'INSERT_ROWS'
        value_range = {
            'values': [row_data]
        }
        result = service.spreadsheets().values().append(
            spreadsheetId=spreadsheet_id, range=range_name,
            valueInputOption=value_input_option, insertDataOption=insert_data_option,
            body=value_range).execute()
        print(f'{result["updates"]["updatedRows"]} rows appended.')
    except HttpError as error:
        print(f'An error occurred: {error}')

if __name__ == '__main__':
    # Create the data ..............O2,CO2,NO2,CO,Tem,Humi
    row_data = [date_str, time_str, 20, 30, 40,48,425,224]
    main(row_data)