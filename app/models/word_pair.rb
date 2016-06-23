class WordPair < ActiveRecord::Base
  validates_presence_of :prefix, :values
end