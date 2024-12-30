const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

class UserController {

    // Register a new user
    async register(req, res) {
        const { firstname, lastname, mobilenumber, password,createdBy } = req.body;

        try {
           
            const existingUser = await User.findOne({ where: { mobilenumber } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                firstname,
                lastname,
                mobilenumber,
                password: hashedPassword,
                createdBy,
                updatedBy: createdBy,
            });

            res.status(200).json({ message: 'User registered successfully' ,newUser});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error registering user' });
        }
    }

    // Login the user
    async login(req, res) {
        const { mobilenumber, password } = req.body;

        try {
            
            const user = await User.findOne({ where: { mobilenumber } });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            
            const token = jwt.sign({ id: user.id, mobilenumber: user.mobilenumber }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error logging in user' });
        }
    }

    // Update user information by ID
    async update(req, res) {
        const { id } = req.params; 
        const { firstname, lastname, mobilenumber, password } = req.body;

        try {
            
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

           
            if (firstname) user.firstname = firstname;
            if (lastname) user.lastname = lastname;
            if (mobilenumber) user.mobilenumber = mobilenumber;
            if (password) {
                
                user.password = await bcrypt.hash(password, 10);
            }

            
            await user.save();

            res.status(200).json({ message: 'User updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating user' });
        }
    }

    // Delete user by ID
    async delete(req, res) {
        const { id } = req.params; 

        try {
            
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

           
            await user.destroy();

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
}

module.exports = new UserController();
