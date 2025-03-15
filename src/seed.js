const bcrypt = require('bcryptjs');
const { User } = require('./models');  // Adjust the path based on where your User model is located

// Function to hash password
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

// Seed data
const seedUsers = [
    {
        name: 'Test User 1',
        email: 'testuser1@example.com',
        password: 'password123',  // Plaintext password will be hashed before saving
        role: 'user',
    },
    {
        name: 'Test User 2',
        email: 'testuser2@example.com',
        password: 'password123',
        role: 'user',
    },
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'admin',
    },
];

// Run seed function
const seedDatabase = async () => {
    try {
        console.log('Seeding users...');
        for (const user of seedUsers) {
            const hashedPassword = await hashPassword(user.password);
            await User.create({
                name: user.name,
                email: user.email,
                password: hashedPassword,
                role: user.role,
            });
        }
        console.log('Seeding complete!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();
