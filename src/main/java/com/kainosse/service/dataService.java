package com.kainosse.service;

import com.kainosse.domain.data;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

/**
 * Created by Daniel on 28.05.2016.
 */
public class dataService {
    private EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("kainosseDatabase");
    private EntityManager em = emfactory.createEntityManager();

    public void addData(data row) {
        em.getTransaction().begin();
        em.persist(row);
        em.getTransaction().commit();
    }

    public data getDataByID(int id) {
        em.getTransaction().begin();
        data row = em.find(data.class, id);
        return row;
    }

    public void removeDataByID(data d) {
        em.getTransaction().begin();
        em.remove(d);
    }

    public List<data> getAllData() {
        return em.createQuery("SELECT row FROM data row").getResultList();
    }

    public List<data> getDataBetween(String older, String newer) {
        return em.createQuery("SELECT row FROM data row WHERE date > \'" + older + "\'" + " AND date < \'" + newer + "\'").getResultList();
    }

    public void closeAll() {
        em.close();
        emfactory.close();
    }
}
