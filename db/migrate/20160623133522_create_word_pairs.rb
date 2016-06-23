class CreateWordPairs < ActiveRecord::Migration
	def change
		create_table :word_pairs do |t|
		  t.string :prefix, null: false
		  t.string :values, array:true , null:false
		  
		  t.timestamps
		end
	end
end

