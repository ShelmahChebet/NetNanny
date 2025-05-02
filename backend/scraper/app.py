from flask import Flask, jsonify
import insta

app = Flask(__name__)

# Handle GET requests sent to /run_script resource
# Request is sent when the user clicks on the "Check Threats" button from the Browser Extension
@app.route('/run_script', methods=['GET'])
def run_script():
    try:
        # run insta.py by calling main()
        result = insta.main()
        return jsonify({"message": result})
    except Exception as e:
        return jsonify({"message": f"Error running scraper: {str(e)}"}), 500
    
    



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
