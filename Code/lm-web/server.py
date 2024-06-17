#we are using tkinter model to demonstrate our dynamic aproach for translating the web page.
#our main model can do this as well with small changes in flask setup and heigh enternet connection because it is on the google colab.


import tkinter as tk
from tkinter import ttk
from googletrans import Translator, LANGUAGES

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Disable CORS
app.config['CORS_HEADERS'] = 'Content-Type'

# Define CORS handler
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response



# #  main window
# root = tk.Tk()
# root.title("Lingua Master") 
# root['bg'] = 'black'

# # Header Label
# header_label = tk.Label(root, text='Language Translator', font='Arial 24 bold', bg='black', fg='white', padx=20, pady=10)
# header_label.grid(row=0, column=0, columnspan=2, sticky='ew')

# # Frame for input and output
# frame = tk.Frame(root, bg='black')
# frame.grid(row=1, column=0, columnspan=2, sticky='nsew')

# # Input Label and Text
# enter_text_label = tk.Label(frame, text='Enter Text:', font='Arial 14 bold', bg='black', fg='white')
# enter_text_label.grid(row=0, column=0, padx=(20, 10), pady=10, sticky='w')
# input_text = tk.Text(frame, font='Arial 12', wrap=tk.WORD, height=4)
# input_text.grid(row=1, column=0, padx=(20, 10), pady=10, sticky='nsew')

# # Output Label and Text
# output_label = tk.Label(frame, text='Translation:', font='Arial 14 bold', bg='black', fg='white')
# output_label.grid(row=2, column=0, padx=(20, 10), pady=10, sticky='w')
# output_text = tk.Text(frame, font='Arial 12', wrap=tk.WORD, width=50, height=8)
# output_text.grid(row=3, column=0, padx=(20, 10), pady=10, sticky='nsew')

# # Destination Language Combobox
# language = list(LANGUAGES.values())
# dest_lang_label = tk.Label(frame, text='Select Language:', font='Arial 14 bold', bg='black', fg='white')
# dest_lang_label.grid(row=4, column=0, padx=(20, 10), pady=10, sticky='w')
# dest_lang = ttk.Combobox(frame, values=language, font='Arial 12')
# dest_lang.grid(row=5, column=0, padx=(20, 10), pady=10, sticky='ew')
# dest_lang.set('Choose language')

# Function to perform translation
# def Translate():
#     translator = Translator()
#     # text_to_translate = input_text.get("1.0", "end-1c")
#     translated = translator.translate(text_to_translate, dest=dest_lang.get())
#     output_text.delete(1.0, tk.END)
#     output_text.insert(tk.END, translated.text)

# # Translate Button
# trans_btn = tk.Button(frame, text='Translate', font='Arial 14 bold', command=Translate, bg='green', fg='white')
# trans_btn.grid(row=6, column=0, padx=(20, 10), pady=10, sticky='ew')

# # row and column weights for responsive resizing
# frame.columnconfigure(0, weight=1)
# frame.rowconfigure(1, weight=1)
# frame.rowconfigure(3, weight=1)

# #   main loop
# root.mainloop()

@app.route('/', methods=['POST'])
def post_request():
    data = request.json
    topic_value = data.get('topic', 'Topic not found')  # Get the value for 'topic' key, default to 'Topic not found' if not present
    # print(topic_value)
    if(topic_value):
        translator = Translator()
        translated = translator.translate(topic_value, dest="hindi")
    return jsonify({
        'success': True,
        'message': 'post request works properly',
        'topic': translated.text,
    })


if __name__ == '__main__':
    port = 4000
    print(f'Port has been started at {port}.')
    app.run(port=port)