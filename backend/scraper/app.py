from flask import Flask, jsonify
import insta

app = Flask(__name__)

@app.route('/run_script', methods=['GET'])
def run_script():
    try:
        result = insta.main()
        return jsonify({"message": result})
    except Exception as e:
        return jsonify({"message": f"Error running scraper: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
