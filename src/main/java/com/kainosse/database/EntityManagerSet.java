package com.kainosse.database;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Created by Daniel on 28.05.2016.
 */
public class EntityManagerSet {
    EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("kainosseDatabase");
    EntityManager em = emfactory.createEntityManager();
}
