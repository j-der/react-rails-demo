class WelcomeController < ApplicationController

  def index  
  end

  def comments
    render json: [{comment: "some random comment from the server."}]
  end

end
