class WordPair < ActiveRecord::Base
  validates_presence_of :prefix, :values

  def addStatement(array)
  	first_key = array[0] << " " << array[1]
  	p first_key
  end

  def createResponse

  end



end