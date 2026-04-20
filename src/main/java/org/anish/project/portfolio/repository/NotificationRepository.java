package org.anish.project.portfolio.repository;

import org.anish.project.portfolio.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {}