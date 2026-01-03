"""
============================================
Gap2Growth - Main Application Entry Point
============================================
This is the main file that initializes and runs
the Flask application.

What this file does:
1. Creates the Flask application instance
2. Loads configuration from config.py
3. Registers all blueprints (route groups)
4. Sets up the template and static folders
5. Runs the development server

To run the application:
    python app.py

Or using Flask CLI:
    flask run
============================================
"""

# Import required modules
from flask import Flask
from config import Config
import os

# Import route blueprints
# Each blueprint contains related routes organized together
from app.routes.frontend_routes import frontend_bp
from app.routes.auth_routes import auth_bp


def create_app():
    """
    Application Factory Function
    
    This function creates and configures the Flask application.
    Using a factory function allows us to create multiple app
    instances for testing or different configurations.
    
    Returns:
        Flask: The configured Flask application instance
    """
    
    # Create Flask app instance
    # __name__ tells Flask where to find templates and static files
    app = Flask(
        __name__,
        template_folder='app/templates',  # Location of HTML templates
        static_folder='app/static'         # Location of CSS, JS, images
    )
    
    # Load configuration from Config class
    # This includes SECRET_KEY, database URLs, etc.
    app.config.from_object(Config)
    
    # ========== REGISTER BLUEPRINTS ==========
    # Blueprints are a way to organize routes into groups
    # Each blueprint can have its own URL prefix
    
    # Frontend routes - serves HTML pages
    # No URL prefix means routes are at the root (e.g., /login)
    app.register_blueprint(frontend_bp)
    
    # API routes for authentication
    # URL prefix /auth means routes are at /auth/* (e.g., /auth/login)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    
    # ========== ERROR HANDLERS ==========
    # Custom error pages for common HTTP errors
    
    @app.errorhandler(404)
    def not_found_error(error):
        """Handle 404 Not Found errors"""
        return "<h1>404 - Page Not Found</h1><p>The page you're looking for doesn't exist.</p>", 404
    
    @app.errorhandler(500)
    def internal_error(error):
        """Handle 500 Internal Server errors"""
        return "<h1>500 - Internal Server Error</h1><p>Something went wrong on our end.</p>", 500
    
    # Return the configured app
    return app


# ========== RUN THE APPLICATION ==========
# This block runs only when the file is executed directly
# (not when imported as a module)

if __name__ == "__main__":
    # Create the Flask app using our factory function
    app = create_app()
    
    # Run the development server
    # - debug=True: Auto-reload on code changes, show detailed errors
    # - host='0.0.0.0': Allow access from other devices on the network
    # - port=5000: Run on port 5000 (default Flask port)
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000
    )
