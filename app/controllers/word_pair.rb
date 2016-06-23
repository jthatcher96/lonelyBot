post "/pairs" do
  @pair = WordPair.create(params[:data])
end

get "/pairs" do

end