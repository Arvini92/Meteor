Router.route('/api',
            {where: 'server'}
).get(function(){
    writeHeaders(this);
    this.response.end('GET is not supported. Sorry! \n');
})
.post(function() {
    writeHeaders(this);
    var useremail = this.request.body.email;
    if (!useremail){
        this.response.end('No user specifired...\n');
        return;
    }
    var user = Meteor.users.findOne({
        emails:{
            $elemMatch : {
                address : useremail
            }
        }
    });

    if (!user) {
        this.response.end('User not found...\n');
    }

    var records = Snippets.find({owner:user._id}).fetch();
    this.response.end(JSON.stringify(records));
})
.put(function() {
    writeHeaders(this);
    var record = this.request.body.update;
    if (!record){
        this.response.end('Nothing requested...\n');
        return;
    }

    var update = Snippets.upsert({
        _id:record.id
    }, {
        $set : record.changes
    });
    console.log(update);
    this.response.end('Snippet Updated!...\n');
})
.delete(function() {
    writeHeaders(this);
    var recID = this.request.body.snippetID;
    if (!recID){
        this.response.end('No ID submitted...\n');
        return;
    }

    var del = Snippets.remove({_id:recID});
    console.log(del);
    this.response.end('Snippet Deleted...\n');
})

function writeHeaders(self) {
    self.response.statusCode = 200;
    self.response.setHeader("Content-Type", "application/json");
    self.response.setHeader("Access-Control-Allow-Origin", "*");
    self.response.setHeader("Access-Control-Allow-Headers", 
                "Origin, X-Requested-With, Content-Type, Accept");
}