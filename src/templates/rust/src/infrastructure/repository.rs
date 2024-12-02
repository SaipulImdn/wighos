use crate::domain::user::User;
use async_trait::async_trait;
use std::sync::Mutex;

#[async_trait]
pub trait UserRepository {
    async fn get_all_users(&self) -> Vec<User>;
    async fn add_user(&self, user: User);
}

pub struct InMemoryUserRepository {
    users: Mutex<Vec<User>>,
}

impl InMemoryUserRepository {
    pub fn new() -> Self {
        Self {
            users: Mutex::new(vec![]),
        }
    }
}

#[async_trait]
impl UserRepository for InMemoryUserRepository {
    async fn get_all_users(&self) -> Vec<User> {
        self.users.lock().unwrap().clone()
    }

    async fn add_user(&self, user: User) {
        self.users.lock().unwrap().push(user);
    }
}
