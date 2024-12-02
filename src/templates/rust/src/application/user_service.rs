use crate::domain::user::User;
use crate::infrastructure::repository::UserRepository;
use uuid::Uuid;

pub struct UserService<T: UserRepository> {
    repository: T,
}

impl<T: UserRepository> UserService<T> {
    pub fn new(repository: T) -> Self {
        Self { repository }
    }

    pub async fn list_users(&self) -> Vec<User> {
        self.repository.get_all_users().await
    }

    pub async fn create_user(&self, name: String, email: String) -> User {
        let user = User {
            id: Uuid::new_v4(),
            name,
            email,
        };
        self.repository.add_user(user.clone()).await;
        user
    }
}
