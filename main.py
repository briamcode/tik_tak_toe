from flask import Flask, jsonify
from flask import render_template
from tik import tic


app = Flask(__name__)

@app.route("/")
def game():
    return render_template('game.html')


@app.route('/tik', methods=['GET'])
def mi_script():
    # Aquí va tu código en Python
    output = tic().mi_script()

   
    # Renderiza el template "tik.html" y pasa la salida a la variable "data"
    return jsonify(output=output)




if __name__ == "__main__":
    app.run(debug=True)
    