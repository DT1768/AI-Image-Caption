const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

// user schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true //trims out any extra spaces
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        encrypt_password: {
            type: String,
            required: true
        },
        salt: String
    },
    {
        timestamps: true
    }
);

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1; //generates a random string
        this.encrypt_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encrypt_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);