var Models = function(mongoose){
	/** Schemas **/
	var userSchema = mongoose.Schema({
			mail: String
		});

	var foeSchema = mongoose.Schema({
			name: String,
			baseHp: Number,
			remainingHp: Number,
			speed: Number,
			def: Number,
			armor: Number,
			xp: Number,
			attrs: {
				Commun: Number,
				Const:Number,
				Cunning: -Number,
				Dext: Number,
				Magic: Number,
				Percep: Number,
				Strenght: Number,
				Willpow: Number
			},
			attacks: [mongoose.Schema.Types.Mixed],
			notes: String,
			alive: Boolean
		});

	var storyPointSchema = mongoose.Schema({
				data:
					{
						story: String,
						xp: Number,
						loot: [String]
					},
				info:
					{
						userId: String,
						storytype: String,
						after: Number,
						until: Number
					},
				combat:
					{
						foes: [foeSchema]
					}
			});

	/** Schema Functions **/
	userSchema.statics = {
			load: function(id,callback){
				this.findOne({_id: id}).exec(callback);
			}
		}

	var User = mongoose.model('User',userSchema);
	var Foe = mongoose.model('Foe',foeSchema);
	var StoryPoint = mongoose.model('StoryPoint',storyPointSchema);
}
exports.do = function(mongoose){return new Models(mongoose);}