var Models = function(mongoose){
/** Schemas **/
	var userSchema = mongoose.Schema({
			mail: String,
			name: String
			//,chapters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'}]
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
				Const: Number,
				Cunning: Number,
				Dext: Number,
				Magic: Number,
				Percep: Number,
				Strenght: Number,
				Willpow: Number
			},
			attacks: [{
				name: String,
				value: String,
				description: String
			}],
			notes: String,
			alive: Boolean
		});

	var chapterSchema = mongoose.Schema({
		userId: String,
		name: String,
		after: String,
		storyPoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'StoryPoint'}]
	});

	var storypointSchema = mongoose.Schema({
		after: String,
		name: String,
		story: String,
		xp: Number,
		loot: [String],
		foes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Foe'}]
	});

/** Schema Functions **/
	userSchema.statics = {
		load: function(id,callback){
			this.findOne({_id: id}).exec(callback);
		}
	};

	chapterSchema.statics = {
		newStorypoint: function(storypointData){
			this.storyPoints.push(storypointData);
		},
		load: function(id){
			return this.findOne({_id: id});
		}
	};

	storypointSchema.statics = {
		load: function(id){
			return this.findOne({_id: id});
		}
	};

	this.User = mongoose.model('User',userSchema);
	this.Foe = mongoose.model('Foe',foeSchema);
	this.Chapter = mongoose.model('Chapter',chapterSchema);
	this.StoryPoint = mongoose.model('StoryPoint',storypointSchema);
};
exports.do = function(mongoose){return new Models(mongoose);};